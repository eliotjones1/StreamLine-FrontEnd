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


class ListMedia(generics.ListAPIView):
    def get(self, request):
        search_query = request.query_params.get('search', None)
        if search_query is None:
            return Response({'error': 'Missing search query'}, status=status.HTTP_400_BAD_REQUEST)

        title = search_query
        movies = getMovies(title)
        shows = getShows(title)

        if movies == None and shows == None:
            return Response({'error': 'Unable to fetch media'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        elif movies == None:
            serialized_shows = []
            for show in shows:
                streaming_providers = getStreamingProviderShow(show['id'])
                serialized_shows.append({
                    'title': show['name'],
                    'release_date': show['first_air_date'],
                    'poster_path': show['poster_path'],
                    'backdrop': show['backdrop_path'],
                    'rating': show['vote_average'],
                    'streaming_providers': streaming_providers if streaming_providers != None else "Not Available",
                    'genres': show['genre_ids'],
                    'overview': show['overview'],
                    'type': 'TV Series',
                    'id': show['id']
                })
                return Response(serialized_shows)
        elif shows == None:
            serialized_movies = []
            for movie in movies:
                streaming_providers = getStreamingProviderMovie(movie['id'])
                serialized_movies.append({
                    'title': movie['title'],
                    'release_date': movie['release_date'],
                    'poster_path': movie['poster_path'],
                    'backdrop': movie['backdrop_path'],
                    'rating': movie['vote_average'],
                    'streaming_providers': streaming_providers if streaming_providers != None else "Not Available",
                    'genres': movie['genre_ids'],
                    'overview': movie['overview'],
                    'type': 'Movie',
                    'id': movie['id']
                })
                return Response(serialized_movies)
        else:
            serialized_movies = []
            serialized_shows = []
            # For each movie, we want to include title, image, rating, release date, and streaming providers
            for movie in movies:
                streaming_providers = getStreamingProviderMovie(movie['id'])

                serialized_movies.append({
                    'title': movie['title'],
                    'release_date': movie['release_date'],
                    'poster_path': movie['poster_path'],
                    'backdrop': movie['backdrop_path'],
                    'rating': movie['vote_average'],
                    'streaming_providers': streaming_providers if streaming_providers != None else "Not Available",
                    'genres': movie['genre_ids'],
                    'overview': movie['overview'],
                    'type': 'Movie'
                })
            # For each show, we want to include title, image, rating, release date, and streaming providers
            for show in shows:

                streaming_providers = getStreamingProviderShow(show['id'])

                serialized_shows.append({
                    'title': show['name'],
                    'release_date': show['first_air_date'],
                    'poster_path': show['poster_path'],
                    'backdrop': show['backdrop_path'],
                    'rating': show['vote_average'],
                    'streaming_providers': streaming_providers if streaming_providers != None else "Not Available",
                    'genres': show['genre_ids'],
                    'overview': show['overview'],
                    'type': 'TV Series'
                })

        output = serialized_movies[0:2] + serialized_shows[0:2]
        return Response(output)


class returnAll(generics.ListAPIView):
    def get(self, request):
        search_query = request.query_params.get('search', None)
        if search_query is None:
            return Response({'error': 'Missing search query'}, status=status.HTTP_400_BAD_REQUEST)

        title = search_query
        # Get Movies
        api_key = "95cd5279f17c6593123c72d04e0bedfa"
        base_url = "https://api.themoviedb.org/3/"
        endpoint = "search/movie?"
        query = title
        full_url = base_url + endpoint + "api_key=" + api_key + \
            "&language=en-US&query=" + query + "&page=1&include_adult=false"
        response = requests.get(full_url)

        if response.status_code != 200:
            return None

        movie_data = response.json()['results']

        # Get shows
        api_key = "95cd5279f17c6593123c72d04e0bedfa"
        base_url = "https://api.themoviedb.org/3/"
        endpoint = "search/tv?"
        query = title
        full_url = base_url + endpoint + "api_key=" + api_key + \
            "&language=en-US&query=" + query + "&include_adult=false"
        response = requests.get(full_url)

        if response.status_code != 200:
            return None

        tv_data = response.json()['results']
        serialized_output = []
        for movie in movie_data:
            streaming_providers = getStreamingProviderMovie(movie['id'])

            serialized_output.append({
                'title': movie['title'],
                'release_date': movie['release_date'],
                'poster_path': movie['poster_path'],
                'backdrop': movie['backdrop_path'],
                'rating': movie['vote_average'],
                'streaming_providers': streaming_providers if streaming_providers != None else "Not Available",
                'genres': movie['genre_ids'],
                'overview': movie['overview'],
                'type': 'Movie',
                'id': movie['id']
            })
        for show in tv_data:
            streaming_providers = getStreamingProviderShow(show['id'])
            serialized_output.append({
                'title': show['name'],
                'release_date': show['first_air_date'],
                'poster_path': show['poster_path'],
                'backdrop': show['backdrop_path'],
                'rating': show['vote_average'],
                'streaming_providers': streaming_providers if streaming_providers != None else "Not Available",
                'genres': show['genre_ids'],
                'overview': show['overview'],
                'type': 'TV Series',
                'id': show['id']
            })

        to_be_returned = sorted(serialized_output, key=lambda k: fuzz.ratio(
            k['title'], title), reverse=True)
        return Response(to_be_returned)


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
    data = request.data
    # Expect email to be at 0
    # Expect budget to be at 1
    user = data[0]
    budget = data[1]
    user_exists = CustomUser.objects.get(email=user)
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
    data = request.data
    # Expect email to be at 0
    # Expect Media to be at 1
    user = data[0]
    object = data[1]
    user_exists = CustomUser.objects.get(email=user)
    current = UserData.objects.get(user_id=user_exists)
    cur_list = current.media
    cur_list.append(object)
    current.save()
    return Response({"Status": "OK"})


@api_view(['POST'])
def removeMedia(request):
    # get sessionid from request cookie
    sessionid = request.COOKIES.get('sessionid')
    # Check if session is active
    if isSessionActive(sessionid) == False:
        return Response({'error': 'Session expired'}, status=status.HTTP_400_BAD_REQUEST)
    data = request.data
    # Expect email to be at 0
    # Expect Media to be at 1
    user = data[0]
    object = data[1]
    user_exists = CustomUser.objects.get(email=user)
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
    data = request.data
    # Expect email to be at 0
    # Expect bundle to be at 1
    user = data[0]
    bundle = data[1]
    user_exists = CustomUser.objects.get(email=user)
    current = UserData.objects.get(user_id=user_exists)
    current.bundle = bundle
    current.save()
    return Response({"Status": "OK"})


class returnUserData(generics.ListAPIView):
    def get(self, request):
        # # get sessionid from request cookie
        sessionid = request.COOKIES.get('sessionid')
        print(sessionid)
        # Check if session is active
        if isSessionActive(sessionid) == False:
            return Response({'error': 'Session expired'}, status=status.HTTP_400_BAD_REQUEST)
        # Get user from session

        query = request.query_params.get('email', None)
        if query is None:
            return Response({'error': 'Missing search query'}, status=status.HTTP_400_BAD_REQUEST)
        email = query
        user_exists = CustomUser.objects.get(email=email)
        output = UserData.objects.get(user_id=user_exists)
        serializer = UserDataSerializer(output)
        return Response(serializer.data)


@api_view(['POST'])
def returnInfo(request):
    object = request.data
    if object["type"] == "Movie":
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
                streaming_providers = getStreamingProviderShow(show['id'])
                serialized_list.append({
                    'title': show['name'],
                    'release_date': show['first_air_date'],
                    'poster_path': show['poster_path'],
                    'backdrop': show['backdrop_path'],
                    'rating': show['vote_average'],
                    'streaming_providers': streaming_providers if streaming_providers != None else "Not Available",
                    'genres': show['genre_ids'],
                    'overview': show['overview'],
                    'type': 'TV Series',
                    'id': show['id']
                })
        for movie in new_movies:
            if datetime.strptime(movie['release_date'], '%Y-%m-%d') < datetime.now():
                streaming_providers = getStreamingProviderMovie(movie['id'])
                serialized_list.append({
                    'title': movie['title'],
                    'release_date': movie['release_date'],
                    'poster_path': movie['poster_path'],
                    'backdrop': movie['backdrop_path'],
                    'rating': movie['vote_average'],
                    'streaming_providers': streaming_providers if streaming_providers != None else "Not Available",
                    'genres': movie['genre_ids'],
                    'overview': movie['overview'],
                    'type': 'Movie',
                    'id': movie['id']
                })
        sorted_data = sorted(
            serialized_list, key=lambda x: x['release_date'], reverse=True)
        recent_dicts = sorted_data[:20]
        return Response(recent_dicts, status=status.HTTP_200_OK)


class popularServices(generics.ListAPIView):
    def get(self, request):

        # Movie providers
        url = "https://api.themoviedb.org/3/watch/providers/movie?language=en-US&watch_region=US"
        headers = {
            "accept": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NWNkNTI3OWYxN2M2NTkzMTIzYzcyZDA0ZTBiZWRmYSIsInN1YiI6IjY0NDg4NTgzMmZkZWM2MDU3M2EwYjk3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VXG36aVRaprnsBeXXhjGq6RmRRoPibEuGsjkgSB-Q-c"
        }
        response = requests.get(url, headers=headers)
        movie_providers = response.json()['results']
        # TV providers
        url = "https://api.themoviedb.org/3/watch/providers/tv?language=en-US&watch_region=US"
        headers = {
            "accept": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NWNkNTI3OWYxN2M2NTkzMTIzYzcyZDA0ZTBiZWRmYSIsInN1YiI6IjY0NDg4NTgzMmZkZWM2MDU3M2EwYjk3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VXG36aVRaprnsBeXXhjGq6RmRRoPibEuGsjkgSB-Q-c"
        }
        response = requests.get(url, headers=headers)
        tv_providers = response.json()['results']
        providers = []
        for provider in movie_providers:
            providers.append(
                {
                    'title': provider['provider_name'],
                    'poster_path': provider['logo_path'],
                    'num': 0
                }
            )
        for provider in tv_providers:
            if provider['provider_name'] not in providers:
                providers.append(
                    {
                        'title': provider['provider_name'],
                        'poster_path': provider['logo_path'],
                        'num': 0
                    }
                )

        all_subs = Subscription.objects.all()
        all_subs = list(all_subs)
        all_subs = [x.subscription_name for x in all_subs]
        for sub in all_subs:
            for provider in providers:
                if provider['title'] == sub:
                    provider['num'] += 1
        sorted_providers = sorted(
            providers, key=lambda x: x['num'], reverse=False)
        temp = set(tuple(item.items()) for item in sorted_providers)
        out = [dict(item) for item in temp]
        return Response(out[:10], status=status.HTTP_200_OK)