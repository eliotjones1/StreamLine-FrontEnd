import requests
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
import requests
from rest_framework import viewsets, status
from .models import UserSettings, UserSubscription, Subscription
from .serializers import UserSettingsSerializer, SubscriptionSerializer
from api.views import isSessionActive
from user_auth.models import CustomUser, UserData
from user_auth.serializers import AuthUserSerializer
from django.contrib.sessions.models import Session
from django.utils import timezone
from django.db.models import Min
import stripe
import sendgrid
from sendgrid.helpers.mail import Mail
import json
from api.functions import *
from .schedule_views import checkSubscriptionStatus
from fuzzywuzzy import process


## GOAL: Personalize our recommendations not only for TV and Movies but also for Streaming Services
## HOW TO DO IT: Beginning of user account subscription, ask them what kind of bundle they want, can either be
## One, where we recommend one service each month within budget, StreamLine, where we maximize their watchlist and minimize budget,
## and Max, where we get everything on watchlist while minimizing cost but without the budget constraint. 
## Can take into account what we would recommend to them, as well as their watchlist, their streaming service history, and budget, 
## and give them a detailed overview each month. Will track subscriptions over time, to see what they like and what they don't like,
## and will weight stuff they do like higher (maybe they like Netflix originals a lot so we weight Netflix higher). 


## New Subscriber Flow:
## 1. User signs up for StreamLine account
## 2. If user isn't subscribed, we don't take down any of their information
## 3. When user subscribes, we prompt them to input their watchlist, and what they are currently subscribed to. 
## These will get saved to UserData. From what they are currently subscribed to, we will get their monthly budget.
## 4. 



class AvailSubs(generics.ListAPIView):
    def get(self, request):

        search_query = request.query_params.get('search', None)
        if search_query is None:
            return Response({'error': 'Missing search query'}, status=status.HTTP_400_BAD_REQUEST)
        
        service_name = search_query
        df = pd.read_csv('api/random/pricing - Sheet2-3.csv')
        avail_services = df["Name"].tolist()

        # return four closest matching services
        results = process.extract(service_name, avail_services, limit=4)
        closest_strings = [result[0] for result in results]
        # return the four closest matching services
        return Response({'results': closest_strings}, status=status.HTTP_200_OK)
    

@api_view(['POST'])
def createSubscription(request):
    sessionid = request.COOKIES.get('sessionid')
    # print(sessionid)
    # Check if session is active
    if isSessionActive(sessionid) == False:
        return Response({'error': 'Session expired'}, status=status.HTTP_400_BAD_REQUEST)
    # expects user_id at 0, subscription info (name, date) at 1. Expect name to be from our list of possible (like a search and drop down type thing, 
    # Needs to be exact string
    user_email = Session.objects.get(session_key=sessionid).get_decoded()['user_email']
    if user_email is None:
        return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
    subscription_info = request.data
    # import dataframe from api/random/serviceImages.csv
    df = pd.read_csv('api/random/serviceImages.csv')
    # find image that corresponds to subscription_info['name']
    image_path = df.loc[df['service_name'] == subscription_info['name']]['logo_path'].values[0]
    user = CustomUser.objects.get(email=user_email)
    this_subscription = Subscription.objects.create(user=user, subscription_name=subscription_info['name'], end_date=subscription_info['date'][:10], num_months=1, num_cancellations=0, is_active=True, subscription_price=subscription_info['price'], subscription_image_path=image_path, subscription_version=subscription_info['version'])
    this_subscription.save()
    return Response(SubscriptionSerializer(this_subscription).data, status=status.HTTP_200_OK)

@api_view(['POST'])
def cancelSubscription(request):
    sessionid = request.COOKIES.get('sessionid')
    # print(sessionid)
    # Check if session is active
    if isSessionActive(sessionid) == False:
        return Response({'error': 'Session expired'}, status=status.HTTP_400_BAD_REQUEST)
    # expects user_id at 0, subscription info (name, date, recurring) at 1
    user_email = Session.objects.get(session_key=sessionid).get_decoded()['user_email']
    if user_email is None:
        return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
    subscription_info = json.dumps(request.data)
    user = CustomUser.objects.get(email=user_email)
    this_subscription = Subscription.objects.create(user=user, subscription_name=subscription_info['name'])
    this_subscription.is_active = False
    this_subscription.num_cancellations += 1
    this_subscription.save()
    return Response(status=status.HTTP_200_OK)

class getSubscriptions(generics.ListAPIView):
    def get(self, request):
        # NAME, LOGO, END DATE, PRICE
        sessionid = request.COOKIES.get('sessionid')
        # print(sessionid)
        # Check if session is active
        if isSessionActive(sessionid) == False:
            return Response({'error': 'Session expired'}, status=status.HTTP_400_BAD_REQUEST)
        # expects user_id at 0, subscription info (name, date, recurring) at 1
        user_email = Session.objects.get(session_key=sessionid).get_decoded()['user_email']
        if user_email is None:
            return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
        user = CustomUser.objects.get(email=user_email)
        subscriptions = Subscription.objects.filter(user=user)
        out = []
        for subscription in subscriptions:
            out.append(SubscriptionSerializer(subscription).data)
        return Response(out, status=status.HTTP_200_OK)