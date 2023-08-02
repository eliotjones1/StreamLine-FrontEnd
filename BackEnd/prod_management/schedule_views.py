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
import pandas as pd
from api.functions import *
from datetime import datetime
from datetime import timedelta



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
    user_email = Session.objects.get(session_key=sessionid).get_decoded()['user_email']
    if user_email is None:
        return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
    user = CustomUser.objects.get(email=user_email)
    tos = TOSChecked.objects.get(user=user)
    tos.TOS_Checked = True
    tos.save()
    return Response(status=status.HTTP_200_OK)

class checkTOSStatus(generics.ListAPIView):
    def get(self, request):
        sessionid = request.COOKIES.get('sessionid')
        print("TOS")
        print(sessionid)
        # Check if session is active
        if isSessionActive(sessionid) == False:
            return Response({'error': 'Session expired'}, status=status.HTTP_400_BAD_REQUEST)
        user_email = Session.objects.get(session_key=sessionid).get_decoded()['user_email']
        if user_email is None:
            return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
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
    user_email = Session.objects.get(session_key=sessionid).get_decoded()['user_email']
    if user_email is None:
        return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
    subscription_info = request.data
    # import dataframe from api/random/serviceImages.csv
    df = pd.read_csv('api/random/serviceImages.csv')
    # find image that corresponds to subscription_info['name']
    image_path = df.loc[df['service_name'] == subscription_info['name']]['logo_path'].values[0]
    user = CustomUser.objects.get(email=user_email)
    this_subscription = Subscription.objects.create(user=user, subscription_name=subscription_info['name'], end_date=subscription_info['date'][:10], num_months=1, num_cancellations=0, is_active=True, subscription_price=subscription_info['price'], subscription_image_path=image_path)
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
        user_email = Session.objects.get(session_key=sessionid).get_decoded()['user_email']
        if user_email is None:
            return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
        user = CustomUser.objects.get(email=user_email)
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
    user_email = Session.objects.get(session_key=sessionid).get_decoded()['user_email']
    if user_email is None:
        return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
    
    user = CustomUser.objects.get(email=user_email)
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
            
@api_view(['POST'])
def generateBundle(request):
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
    user_data = UserData.objects.get(user=user)
    cur_subs =  Subscription.objects.filter(user=user)

    # TODO: Get all subscriptions for the user and create bundle
    # Bundle requires Links, Title, Subheader, Images, Total_Cost, Streaming_Services, Movies_and_TV_Shows
    # How to do: get user watchlist, and rig the optimization function to only include items not on current subscriptions

    # Get all titles on watchlist, current subscriptions
    subscriptions = list(cur_subs.values_list('subscription_name', flat=True))
    input = user_data.media
    providers, prices, services = modify_input(input)

    ## Run optimization, but only on items not on current subscriptions
    watchlist = list(providers.keys())
    if len(watchlist) == 0:
        return Response(["Not available"], status=status.HTTP_400_BAD_REQUEST)
    x = {m: cp.Variable(boolean=True) for m in watchlist}
    y = {s: cp.Variable(boolean=True) for s in services}
    objective = cp.Minimize(cp.sum(1 - cp.vstack([x[m] for m in watchlist])))

    constraints = []
    for m in providers:
        constraints += [x[m] <= cp.sum(cp.vstack([y[s] for s in providers[m]]))]
        for s in services:
            if s in providers[m]:
                constraints += [y[s] <= cp.sum(cp.vstack([x[m] for m in providers]))]
    for s in services:
        if s in subscriptions:
            constraints += [y[s] == 1]
        else:
            constraints += [y[s] == 0]
    problem = cp.Problem(objective, constraints)
    problem.solve()

    output = {}
    output["Title"] = "Personal Bundle"
    output["Subheader"] = "Just for you"
    output["Movies_and_TV_Shows"] = []
    output["Streaming_Services"] = []
    output["Total_Cost"] = 0

    output["Movies_and_TV_Shows"] = []
    output["Type"] = []
    for s in services:
        if y[s].value == 1:
            output["Streaming_Services"].append(s)
            output["Total_Cost"] += prices[s]

    for m in watchlist:
        if x[m].value == 1:
            output["Movies_and_TV_Shows"].append(m)

    for media in output["Movies_and_TV_Shows"]:
        for object in input:
            if media == object["title"]:
                output["Type"].append(object["type"])
    realOutput = getServiceImages(output)
    print(realOutput)
    user_data.bundle = realOutput
    user_data.budget = realOutput["Total_Cost"]
    user_data.save()
    return Response(status=status.HTTP_200_OK)



## UPCOMING RELEASES ON PLATFORMS A USER IS SUBSCRIBED TO NEEDED
## A VERSION OF THIS THAT ISN'T LIMITED TO A USER'S SUBSCRIPTIONS NEEDED

class getMyUpcoming(generics.ListAPIView):
    def get(self, request):
        sessionid = request.COOKIES.get('sessionid')
        if isSessionActive(sessionid) == False:
            return Response({'error': 'Session expired'}, status=status.HTTP_400_BAD_REQUEST)
        user_email = Session.objects.get(session_key=sessionid).get_decoded()['user_email']
        if user_email is None:
            return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
        user = CustomUser.objects.get(email=user_email)
        subscriptions = Subscription.objects.filter(user=user)
        subscriptions = list(subscriptions.values_list('subscription_name', flat=True))
        # Get subscription ids from subscription names
        df = pd.read_csv('api/random/serviceImages.csv')
        df = df[df['service_name'].isin(subscriptions)]
        subscription_ids = []
        for subscription in subscriptions:
            subscription_ids.append(str(df.loc[df['service_name'] == subscription]['id'].values[0]))

        release_year = datetime.now().year
        separator = "|"
        subscription_ids = separator.join(subscription_ids)
        # TV SHOWS
        url = "https://api.themoviedb.org/3/discover/tv?first_air_date_year=" + str(release_year) + "&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&watch_region=US&with_watch_providers=" + subscription_ids
        headers = {
            "accept": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NWNkNTI3OWYxN2M2NTkzMTIzYzcyZDA0ZTBiZWRmYSIsInN1YiI6IjY0NDg4NTgzMmZkZWM2MDU3M2EwYjk3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VXG36aVRaprnsBeXXhjGq6RmRRoPibEuGsjkgSB-Q-c"
        }
        response = requests.get(url, headers=headers)
        new_shows = response.json()['results']

        # MOVIES
        url = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=" + str(release_year) + "&sort_by=popularity.desc&watch_region=US&with_watch_providers=" + subscription_ids
        headers = {
            "accept": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NWNkNTI3OWYxN2M2NTkzMTIzYzcyZDA0ZTBiZWRmYSIsInN1YiI6IjY0NDg4NTgzMmZkZWM2MDU3M2EwYjk3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VXG36aVRaprnsBeXXhjGq6RmRRoPibEuGsjkgSB-Q-c"
        }
        response = requests.get(url, headers=headers)
        new_movies = response.json()['results']

        # NEED TO FIND SHOWS BEING RELEASED THIS WEEK
        output = []
        for show in new_shows:
            # Check if it is released this week
            if show['first_air_date'] is not None and show['first_air_date'][:10] >= str(datetime.now().date()) and show['first_air_date'][:10] <= str(datetime.now().date() + timedelta(days=7)):
                # Check if it is on a subscription
                output.append(show)
        for movie in new_movies:
            # Check if it is released this week
            if movie['release_date'] is not None and movie['release_date'][:10] >= str(datetime.now().date()) and movie['release_date'][:10] <= str(datetime.now().date() + timedelta(days=7)):
                # Check if it is on a subscription
                output.append(movie)
        return Response(output, status=status.HTTP_200_OK)
                

