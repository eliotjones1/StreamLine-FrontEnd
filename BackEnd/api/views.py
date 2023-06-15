import requests
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .functions import *
import cvxpy as cp
from user_auth.models import UserData, CustomUser
from user_auth.serializers import UserDataSerializer
from django.core.cache import cache
from fuzzywuzzy import fuzz
# Create your views here.
class ListMovies(generics.ListAPIView):
    def get(self, request):
        search_query = request.query_params.get('search', None)
        if search_query is None:
            return Response({'error': 'Missing search query'}, status=status.HTTP_400_BAD_REQUEST)
        
        title = search_query
        movies = getMovies(title)

        if movies == None:
            return Response({'error': 'Unable to fetch movies'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        serialized_movies = []
        # For each movie, we want to include title, image, rating, release date, and streaming providers 
        for movie in movies:

            streaming_providers = getStreamingProviderMovie(movie['id'])

            serialized_movies.append({
                'title': movie['title'],
                'release_date': movie['release_date'],
                'image': movie['poster_path'],
                'rating': movie['vote_average'],
                'streaming_providers': streaming_providers if streaming_providers != None else "Not Available"
                })
        return Response(serialized_movies)

class ListShows(generics.ListAPIView):
    def get(self, request):
        search_query = request.query_params.get('search', None)
        if search_query is None:
            return Response({'error': 'Missing search query'}, status=status.HTTP_400_BAD_REQUEST)
        
        title = search_query
        shows = getShows(title)

        if shows == None:
            return Response({'error': 'Unable to fetch shows'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        serialized_shows = []
        # For each show, we want to include title, image, rating, release date, and streaming providers 
        for show in shows:

            streaming_providers = getStreamingProviderShow(show['id'])

            serialized_shows.append({
                'title': show['name'],
                'release_date': show['first_air_date'],
                'image': show['poster_path'],
                'rating': show['vote_average'],
                'streaming_providers': streaming_providers if streaming_providers != None else "Not Available"
                })
        return Response(serialized_shows)
    
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
                    'image': show['poster_path'],
                    'rating': show['vote_average'],
                    'streaming_providers': streaming_providers if streaming_providers != None else "Not Available",
                    'type': 'TV Series'
                    })
                return Response(serialized_shows)
        elif shows == None:
            serialized_movies = []
            for movie in movies:
                streaming_providers = getStreamingProviderMovie(movie['id'])
                serialized_movies.append({
                    'title': movie['title'],
                    'release_date': movie['release_date'],
                    'image': movie['poster_path'],
                    'rating': movie['vote_average'],
                    'streaming_providers': streaming_providers if streaming_providers != None else "Not Available",
                    'type': 'Movie'
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
                    'image': movie['poster_path'],
                    'rating': movie['vote_average'],
                    'streaming_providers': streaming_providers if streaming_providers != None else "Not Available",
                    'type': 'Movie'
                    })
            # For each show, we want to include title, image, rating, release date, and streaming providers 
            for show in shows:

                streaming_providers = getStreamingProviderShow(show['id'])

                serialized_shows.append({
                    'title': show['name'],
                    'release_date': show['first_air_date'],
                    'image': show['poster_path'],
                    'rating': show['vote_average'],
                    'streaming_providers': streaming_providers if streaming_providers != None else "Not Available",
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
        full_url = base_url + endpoint + "api_key=" + api_key + "&language=en-US&query=" + query + "&page=1&include_adult=false"
        response = requests.get(full_url)

        if response.status_code != 200:
            return None

        movie_data = response.json()['results']

        # Get shows
        api_key = "95cd5279f17c6593123c72d04e0bedfa"
        base_url = "https://api.themoviedb.org/3/"
        endpoint = "search/tv?"
        query = title
        full_url = base_url + endpoint + "api_key=" + api_key + "&language=en-US&query=" + query + "&include_adult=false"
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
                'image': movie['poster_path'],
                'rating': movie['vote_average'],
                'streaming_providers': streaming_providers if streaming_providers != None else "Not Available",
                'type': 'Movie'
            })
        for show in tv_data:
            streaming_providers = getStreamingProviderShow(show['id'])
            serialized_output.append({
                'title': show['name'],
                'release_date': show['first_air_date'],
                'image': show['poster_path'],
                'rating': show['vote_average'],
                'streaming_providers': streaming_providers if streaming_providers != None else "Not Available",
                'type': 'TV Series'
            })


        to_be_returned = sorted(serialized_output, key = lambda k: fuzz.ratio(k['title'], title), reverse = True)
        return to_be_returned

@api_view(['GET'])
def getProgress(request):
    progress = cache.get('progress', 0)  # default to 0 if no progress is stored
    return Response({'progress': progress})

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
    data = request.data
    # Expect email to be at 0
    # Expect budget to be at 1
    user = data[0]
    budget = data[1]
    user_exists = CustomUser.objects.get(email = user)
    current = UserData.objects.get(user_id = user_exists)
    current.budget = budget
    current.save()
    return Response({"Status":"OK"})

@api_view(['POST'])
def saveMedia(request):
    data = request.data
    # Expect email to be at 0
    # Expect Media to be at 1
    user = data[0]
    media = data[1]
    user_exists = CustomUser.objects.get(email = user)
    current = UserData.objects.get(user_id = user_exists)
    current.media = media
    current.save()
    return Response({"Status":"OK"})

@api_view(['POST'])
def saveBundle(request):
    data = request.data
    # Expect email to be at 0
    # Expect bundle to be at 1
    user = data[0]
    bundle = data[1]
    user_exists = CustomUser.objects.get(email = user)
    current = UserData.objects.get(user_id = user_exists)
    current.bundle = bundle
    current.save()
    return Response({"Status":"OK"})

class returnUserData(generics.ListAPIView):
     def get(self, request):
        query = request.query_params.get('email', None)
        if query is None:
            return Response({'error': 'Missing search query'}, status=status.HTTP_400_BAD_REQUEST)
        email = query
        user_exists = CustomUser.objects.get(email = email)
        output = UserData.objects.get(user_id = user_exists)
        serializer = UserDataSerializer(output)
        return Response(serializer.data)
         
    


