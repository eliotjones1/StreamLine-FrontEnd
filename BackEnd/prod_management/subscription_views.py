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
    



