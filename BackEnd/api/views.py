import requests
from django.shortcuts import render
from datetime import datetime
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .functions import *
import cvxpy as cp
from user_auth.models import UserData, CustomUser
from user_auth.serializers import UserDataSerializer
from django.core.cache import cache
from fuzzywuzzy import fuzz
from django.contrib.sessions.models import Session
from django.utils import timezone
from prod_management.models import Subscription
# Create your views here.

class returnAll(generics.ListAPIView):
    def get(self, request):
        search_query = request.query_params.get('search', None)
        if search_query is None:
            return Response({'error': 'Missing search query'}, status=status.HTTP_400_BAD_REQUEST)

        title = search_query
        # Get Movies
        

        url = "https://api.themoviedb.org/3/search/multi?query=Star%20Wars&include_adult=false&language=en-US&page=1"

        headers = {
            "accept": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NWNkNTI3OWYxN2M2NTkzMTIzYzcyZDA0ZTBiZWRmYSIsInN1YiI6IjY0NDg4NTgzMmZkZWM2MDU3M2EwYjk3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VXG36aVRaprnsBeXXhjGq6RmRRoPibEuGsjkgSB-Q-c"
        }

        response = requests.get(url, headers=headers)
        if response.status_code != 200:
            return None
        data = response.json()['results']
        print(data)
        return Response(data, status=status.HTTP_200_OK)


@api_view(['GET'])
def getProgress(request):
    # default to 0 if no progress is stored
    progress = cache.get('progress', 0)
    return Response({'progress': progress})


def isSessionActive(sessionid):
    try:
        session = Session.objects.get(pk=sessionid)
    except:
        return False
    if session.expire_date > timezone.now():
        return True
    else:
        return False

class isAuthenticated(generics.ListAPIView):
    def get(self, request):
        sessionid = request.COOKIES.get('sessionid')
        print("AUTH")
        print(sessionid)
        if isSessionActive(sessionid) == False:
            return Response({'error': 'Session expired'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"Status": "OK"})

@api_view(['POST'])
def runOptimization(request):
    data = request.data
    # remove "budget" from data
    budget = data[-1]
    data = data[:-1]

    providers, prices, services = modify_input(data)
    streamLine = optimize1(providers, prices, services, budget, data)
    maximal = optimize2(providers, prices, services, data)
    minimal = optimize3(providers, prices, services, budget, data)
    return Response([minimal, streamLine, maximal])


@api_view(['POST'])
def saveBudget(request):
    # get sessionid from request cookie
    sessionid = request.COOKIES.get('sessionid')
    # Check if session is active
    if isSessionActive(sessionid) == False:
        return Response({'error': 'Session expired'}, status=status.HTTP_400_BAD_REQUEST)

    budget = request.data
    user_email = Session.objects.get(session_key=sessionid).get_decoded()['user_email']
    if user_email is None:
        return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)        

    user_exists = CustomUser.objects.get(email=user_email)
    current = UserData.objects.get(user_id=user_exists)
    current.budget = budget
    current.save()
    return Response({"Status": "OK"})


@api_view(['POST'])
def saveMedia(request):
    # get sessionid from request cookie
    sessionid = request.COOKIES.get('sessionid')
    # Check if session is active
    if isSessionActive(sessionid) == False:
        return Response({'error': 'Session expired'}, status=status.HTTP_400_BAD_REQUEST)
    user_email = Session.objects.get(session_key=sessionid).get_decoded()['user_email']
    if user_email is None:
        return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
    # Expects a dict with "id" and "type" as keys
    object = request.data
    user_exists = CustomUser.objects.get(email=user_email)
    current = UserData.objects.get(user_id=user_exists)
    cur_list = current.media
    print(cur_list)
    print(object)
    cur_list.append(object)
    print(cur_list)
    current.save()
    return Response({"Status": "OK"})

@api_view(['POST'])
def clearMedia(request):
 # get sessionid from request cookie
    sessionid = request.COOKIES.get('sessionid')
    # Check if session is active
    if isSessionActive(sessionid) == False:
        return Response({'error': 'Session expired'}, status=status.HTTP_400_BAD_REQUEST)
    object = request.data
    user_email = Session.objects.get(session_key=sessionid).get_decoded()['user_email']
    if user_email is None:
        return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
    user_exists = CustomUser.objects.get(email=user_email)
    current = UserData.objects.get(user_id=user_exists)
    current.media = object
    current.save()
    return Response({"Status": "OK"})

@api_view(['POST'])
def removeMedia(request):
    # get sessionid from request cookie
    sessionid = request.COOKIES.get('sessionid')
    # Check if session is active
    if isSessionActive(sessionid) == False:
        return Response({'error': 'Session expired'}, status=status.HTTP_400_BAD_REQUEST)
    user_email = Session.objects.get(session_key=sessionid).get_decoded()['user_email']
    if user_email is None:
        return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
    # Expect email to be at 0
    # Expect Media to be at 1
    object = request.data
    user_exists = CustomUser.objects.get(email=user_email)
    current = UserData.objects.get(user_id=user_exists)
    cur_list = current.media
    cur_list.remove(object)
    current.save()
    return Response({"Status": "OK"})


@api_view(['POST'])
def saveBundle(request):
    # get sessionid from request cookie
    sessionid = request.COOKIES.get('sessionid')
    # Check if session is active
    if isSessionActive(sessionid) == False:
        return Response({'error': 'Session expired'}, status=status.HTTP_400_BAD_REQUEST)
    user_email = Session.objects.get(session_key=sessionid).get_decoded()['user_email']
    if user_email is None:
        return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
    # Expect email to be at 0
    # Expect bundle to be at 1
    bundle = request.data
    user_exists = CustomUser.objects.get(email=user_email)
    current = UserData.objects.get(user_id=user_exists)
    current.bundle = bundle
    current.save()
    return Response({"Status": "OK"})


class returnUserData(generics.ListAPIView):
    def get(self, request):
        # # get sessionid from request cookie
        sessionid = request.COOKIES.get('sessionid')
        print("DATA")
        print(sessionid)
        # Check if session is active
        if isSessionActive(sessionid) == False:
            return Response({'error': 'Session expired'}, status=status.HTTP_400_BAD_REQUEST)
        # Get user from session
        user_email = Session.objects.get(session_key=sessionid).get_decoded()['user_email']
        if user_email is None:
            return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
        user_exists = CustomUser.objects.get(email=user_email)
        output = UserData.objects.get(user_id=user_exists)
        serializer = UserDataSerializer(output)
        return Response(serializer.data)


@api_view(['POST'])
def returnInfo(request):
    object = request.data
    if object["media_type"] == "movie":
        id = object['id']
        api_key = "95cd5279f17c6593123c72d04e0bedfa"
        base_url = "https://api.themoviedb.org/3/"
        endpoint = "movie/"
        full_url = base_url + endpoint + \
            str(id) + "?api_key=" + api_key + "&language=en-US"
        response = requests.get(full_url)
        if response.status_code != 200:
            return None
        movie_data = response.json()
        movie_data['media_type'] = object['media_type']
        streaming_providers = getStreamingProviderMovie(id)
        movie_data['streaming_providers'] = streaming_providers if streaming_providers != None else "Not Available"
        return Response(movie_data)
    else:
        id = object['id']
        api_key = "95cd5279f17c6593123c72d04e0bedfa"
        base_url = "https://api.themoviedb.org/3/"
        endpoint = "tv/"
        full_url = base_url + endpoint + \
            str(id) + "?api_key=" + api_key + "&language=en-US"
        response = requests.get(full_url)
        if response.status_code != 200:
            return None
        show_data = response.json()
        show_data['media_type'] = object['media_type']
        streaming_providers = getStreamingProviderShow(id)
        show_data['streaming_providers'] = streaming_providers if streaming_providers != None else "Not Available"
        return Response(show_data)


class newlyReleased(generics.ListAPIView):
    def get(self, request):

        # TV SHOWS
        url = "https://api.themoviedb.org/3/discover/tv?first_air_date_year=2023&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&watch_region=US"
        headers = {
            "accept": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NWNkNTI3OWYxN2M2NTkzMTIzYzcyZDA0ZTBiZWRmYSIsInN1YiI6IjY0NDg4NTgzMmZkZWM2MDU3M2EwYjk3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VXG36aVRaprnsBeXXhjGq6RmRRoPibEuGsjkgSB-Q-c"
        }
        response = requests.get(url, headers=headers)
        new_shows = response.json()['results']

        # MOVIES
        url = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=2023&sort_by=popularity.desc&watch_region=US"
        headers = {
            "accept": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NWNkNTI3OWYxN2M2NTkzMTIzYzcyZDA0ZTBiZWRmYSIsInN1YiI6IjY0NDg4NTgzMmZkZWM2MDU3M2EwYjk3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VXG36aVRaprnsBeXXhjGq6RmRRoPibEuGsjkgSB-Q-c"
        }
        response = requests.get(url, headers=headers)
        new_movies = response.json()['results']

        # Need top 20, take the 20 most recent
        serialized_list = []
        for show in new_shows:
            if datetime.strptime(show['first_air_date'], '%Y-%m-%d') < datetime.now():
                serialized_list.append({
                    'title': show['name'],
                    'release_date': show['first_air_date'],
                    'poster_path': show['poster_path'],
                    'backdrop': show['backdrop_path'],
                    'rating': show['vote_average'],
                    'genres': show['genre_ids'],
                    'overview': show['overview'],
                    'type': 'TV Series',
                    'id': show['id']
                })
        for movie in new_movies:
            if datetime.strptime(movie['release_date'], '%Y-%m-%d') < datetime.now():
                serialized_list.append({
                    'title': movie['title'],
                    'release_date': movie['release_date'],
                    'poster_path': movie['poster_path'],
                    'backdrop': movie['backdrop_path'],
                    'rating': movie['vote_average'],
                    'genres': movie['genre_ids'],
                    'overview': movie['overview'],
                    'type': 'Movie',
                    'id': movie['id']
                })
        sorted_data = sorted(
            serialized_list, key=lambda x: x['release_date'], reverse=True)
        recent_dicts = sorted_data[:20]
        return Response(recent_dicts, status=status.HTTP_200_OK)


