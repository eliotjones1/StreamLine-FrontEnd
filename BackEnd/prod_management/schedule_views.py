import requests
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
import requests
from rest_framework import viewsets, status
from .models import UserSettings, UserSubscription, Subscription, TOSChecked
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


# Create your views here.
@api_view(['POST'])
def agreeTOS(request):
    sessionid = request.COOKIES.get('sessionid')
    # print(sessionid)
    # Check if session is active
    if isSessionActive(sessionid) == False:
        return Response({'error': 'Session expired'}, status=status.HTTP_400_BAD_REQUEST)
    # expects user_id at 0, subscription info (name, date) at 1. Expect name to be from our list of possible (like a search and drop down type thing, 
    # Needs to be exact string
    user_email = request.data[0]
    print(request.data)
    user = CustomUser.objects.get(email=user_email)
    tos = TOSChecked.objects.get(user=user)
    tos.TOS_Checked = True
    tos.save()
    return Response(status=status.HTTP_200_OK)

class checkTOSStatus(generics.ListAPIView):
    def get(self, request):
        sessionid = request.COOKIES.get('sessionid')
        print(sessionid)
        # Check if session is active
        if isSessionActive(sessionid) == False:
            return Response({'error': 'Session expired'}, status=status.HTTP_400_BAD_REQUEST)
        user_email = request.query_params.get('email', None)
        if user_email is None:
            return Response({'error': 'No email provided'}, status=status.HTTP_400_BAD_REQUEST)
        user = CustomUser.objects.get(email=user_email)
        tos = TOSChecked.objects.get(user=user)
        if tos.TOS_Checked == True:
            return Response("ok", status=status.HTTP_200_OK)
        else:
            return Response("not ok", status=status.HTTP_200_OK)
        
@api_view(['POST'])
def createSubscription(request):
    sessionid = request.COOKIES.get('sessionid')
    # print(sessionid)
    # Check if session is active
    if isSessionActive(sessionid) == False:
        return Response({'error': 'Session expired'}, status=status.HTTP_400_BAD_REQUEST)
    # expects user_id at 0, subscription info (name, date) at 1. Expect name to be from our list of possible (like a search and drop down type thing, 
    # Needs to be exact string
    user_email = request.data[0]
    subscription_info = request.data[1]

    user = CustomUser.objects.get(email=user_email)
    this_subscription = Subscription.objects.create(user=user, subscription_name=subscription_info['name'], end_date=subscription_info['date'][:10], num_months=1, num_cancellations=0, is_active=True)
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
    user_email = request.data[0]
    subscription_info = json.dumps(request.data[1])
    user = CustomUser.objects.get(email=user_email)
    this_subscription = Subscription.objects.create(user=user, subscription_name=subscription_info['name'])
    this_subscription.is_active = False
    this_subscription.num_cancellations += 1
    this_subscription.save()
    return Response(status=status.HTTP_200_OK)

class getSubscriptions(generics.ListAPIView):
    def get(self, request):
        sessionid = request.COOKIES.get('sessionid')
        # print(sessionid)
        # Check if session is active
        if isSessionActive(sessionid) == False:
            return Response({'error': 'Session expired'}, status=status.HTTP_400_BAD_REQUEST)
        # expects user_id at 0, subscription info (name, date, recurring) at 1
        email = request.query_params.get('email', None)
        if email is None:
            return Response({'error': 'No email provided'}, status=status.HTTP_400_BAD_REQUEST)
        user = CustomUser.objects.get(email=email)
        subscriptions = Subscription.objects.filter(user=user)
        out = []
        for subscription in subscriptions:
            out.append(SubscriptionSerializer(subscription).data)
        return Response(out, status=status.HTTP_200_OK)

## Find a way to figure out when to email / when to define cycles
## Customer adds subscriptions to their account. Before each subscription is up, we calculate bundles for them,
## By removing all movies and TV shows that are on currently existing subscriptions. 
# EXAMPLE: next subscription is Netflix. We look at watchlist, and remove all titles that are offered on services
# currently subscribed to, except Netflix. We then calculate new bundles, including stuff offered on Netflix and stuff the user
# doesn't currently have access to. Calculate the cost-effectiveness of Netflix: num items / price, vs cost effectiveness of other bundles.
# Can recommend three different actions: cancel netflix if there aren't any items on watchlist on Netflix, keep Netflix if the majority of 
# items left are on Netflix, or pay for something else (better cost effectiveness). 
# Can display on UserDash at all times for subscribed users. 

def checkSubscriptionStatus(user):
    sl_subscription = UserSubscription.objects.get(user = user)

    # Check if subscription basic expiration date was before current time)
    if sl_subscription.Basic_Expiration is not None and sl_subscription.Basic_Expiration < timezone.now():
        sl_subscription.Basic = False
        sl_subscription.Basic_Expiration = None
        sl_subscription.save()
        # Check if subscription premium expiration date was before current time)
    if sl_subscription.Premium_Expiration is not None and sl_subscription.Premium_Expiration < timezone.now():
        sl_subscription.Premium = False
        sl_subscription.Premium_Expiration = None
        sl_subscription.save()
    if sl_subscription is None or (sl_subscription.Basic == False and sl_subscription.Premium == False):
        return False
    return True

class actionItems(generics.ListAPIView):
    def get(self, request):
        sessionid = request.COOKIES.get('sessionid')
        # print(sessionid)
        # Check if session is active
        if isSessionActive(sessionid) == False:
            return Response({'error': 'Session expired'}, status=status.HTTP_400_BAD_REQUEST)
        email = request.query_params.get('email', None)
        if email is None:
            return Response({'error': 'No email provided'}, status=status.HTTP_400_BAD_REQUEST)
        user = CustomUser.objects.get(email=email)
        sub_status = checkSubscriptionStatus(user)
        if not sub_status:
            return Response({'error': 'No StreamLine subscription'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            OUR_RECOMMENDATION = ""
            today = timezone.now().date()
            closest_date = Subscription.objects.filter(user=user).aggregate(closest_date=Min('date'))['closest_date']
            if closest_date is None:
                return Response({'error': 'User has no subscriptions'}, status=status.HTTP_400_BAD_REQUEST)
            subscriptions = Subscription.obkects.get(user = user)
            names = []
            for subscription in subscriptions:
                names += subscription.subscription_name
            closest_sub = Subscription.objects.get(user=user, date=closest_date).subscription_name
            names.remove(closest_sub)
            names = set(names)
            # Get all titles on watchlist
            watchlist = UserData.objects.get(user=user).media
            on_closest_sub = []
            for item in watchlist:
                services = set(item["streaming_providers"]["flatrate"])
                if services.intersection(names):
                    watchlist.remove(item)
                if closest_sub in services:
                    on_closest_sub.append(item)
                    watchlist.remove(item)
            
            # Watchlist is now all items not included in current susbcriptions 
            # on closest sub is all items included in current sub
            # closest_sub is name of subscription we are handling
            if len(on_closest_sub) == 0:
                OUR_RECOMMENDATION = "Delete " + {closest_sub}
                output = {
                    "recommendation": OUR_RECOMMENDATION,
                    "plan": closest_sub
                }
                return Response(output, status=status.HTTP_200_OK)
            cur_prices = modify_input(on_closest_sub)[1]
            budget = cur_prices[closest_sub]
            current_ratio = len(on_closest_sub) / budget

            alt_providers, alt_prices, alt_services = modify_input(watchlist)
            alt_plan = optimize1(alt_providers, alt_prices, alt_services, budget, watchlist)
            alt_ratio = len(alt_plan["Movies_and_TV_Shows"]) / alt_plan["Price"]

            if current_ratio >= alt_ratio:
                OUR_RECOMMENDATION = "Keep " + {closest_sub}
                output = {
                    "recommendation": OUR_RECOMMENDATION,
                    "plan": closest_sub
                }
                return Response(output, status=status.HTTP_200_OK)

            else:
                services_out = ', '.join(alt_plan["Services"])
                OUR_RECOMMENDATION = "Switch to " + services_out + " for " + alt_plan["Price"]
                output = {
                    "recommendation": OUR_RECOMMENDATION,
                    "plan": alt_plan
                }
                return Response(output, status=status.HTTP_200_OK)
            

@api_view(['POST'])
def handleSelection(request):
    sessionid = request.COOKIES.get('sessionid')
    # print(sessionid)
    # Check if session is active
    if isSessionActive(sessionid) == False:
        return Response({'error': 'Session expired'}, status=status.HTTP_400_BAD_REQUEST)
    # Needs to get the exact response from get request above back, but with "email": session.email
    email = request.data["email"]
    if email is None:
        return Response({'error': 'No email provided'}, status=status.HTTP_400_BAD_REQUEST)
    user = CustomUser.objects.get(email=email)
    sub_status = checkSubscriptionStatus(user)
    if not sub_status:
        return Response({'error': 'No StreamLine subscription'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        recommendation = request.data["recommendation"]
        plan = request.data["plan"]
        if "Delete" in recommendation:
            # Delete subscription
            subscription = Subscription.objects.get(user=user, subscription_name=plan)
            subscription.delete()
            return Response("Deleted", status=status.HTTP_200_OK)
        elif "Keep" in recommendation:
            subscription = Subscription.objects.get(user=user, subscription_name=plan)
            subscription.end_date = subscription.end_date + 30
            subscription.save()
            return Response("Kept", status=status.HTTP_200_OK)
        else:
            # Switch to new plan
            cur_bundle = UserData.objects.get(user=user).bundle
            cur_bundle["Movies_and_TV_Shows"] += plan["Movies_and_TV_Shows"]
            cur_bundle["Price"] += plan["Price"]
            cur_bundle["Services"] += plan["Services"]
            cur_bundle["Streaming_Providers"] += plan["Streaming_Providers"]
            cur_bundle["Images"] += plan["Images"]
            cur_bundle["Links"] += plan["Links"]
            for service in plan["Streaming_Providers"]:
                temp_sub = Subscription.objects.create(user=user, subscription_name=service, end_date=timezone.now().date() + 30, recurring=False)
                temp_sub.save()
            return Response("Updated", status=status.HTTP_200_OK)
            
        


