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

    watchlist = list(providers.keys())
    if len(watchlist) == 0:
        return Response(["No movies available"], status=status.HTTP_400_BAD_REQUEST)
    x = {m: cp.Variable(boolean=True) for m in watchlist}
    y = {s: cp.Variable(boolean=True) for s in services}

    objective = cp.sum(1 - cp.vstack([x[m] for m in watchlist]))


    constraints = [
        cp.sum(cp.vstack([y[s] * prices[s] for s in services])) <= budget,
    ]
    for m in providers:
        print(m)
        constraints += [x[m] <= cp.sum(cp.vstack([y[s] for s in providers[m]]))]
        for s in services:
            if s in providers[m]:
                constraints += [y[s] <= cp.sum(cp.vstack([x[m] for m in providers]))]
    
    problem = cp.Problem(cp.Minimize(objective), constraints)
    problem.solve()
    watch_opt = []
    stream_opt = []
    for m in watchlist:
        if x[m].value == 1:
            watch_opt.append(m)
    for s in services:
        if y[s].value == 1:
            stream_opt.append(s)
    
    z = {m: cp.Variable(boolean=True) for m in watch_opt}
    w = {s: cp.Variable(boolean=True) for s in stream_opt}

    objective = cp.sum(cp.vstack([w[s] * prices[s] for s in stream_opt]))

    constraints = [
        cp.sum(cp.vstack([w[s] * prices[s] for s in stream_opt])) <= budget
    ]
    for m in watch_opt:
        constraints.append(cp.sum(cp.vstack([w[s] for s in stream_opt if s in providers[m]])) >= z[m])
        constraints.append(z[m] == 1)

    
    new_problem = cp.Problem(cp.Minimize(objective), constraints)
    new_problem.solve()

    output = {}
    output["Title"] = "Value Bundle"
    output["Subheader"] = "StreamLine Recommended"
    output["Movies_and_TV_Shows"] = []
    output["Streaming_Services"] = []
    output["Total_Cost"] = 0
    
    output["Movies_and_TV_Shows"] = watch_opt
    
    for s in stream_opt:
        if w[s].value == 1:
            output["Streaming_Services"].append(s)
            output["Total_Cost"] += prices[s]

    realOutput = getServiceImages(output)
    return Response([realOutput.copy(), realOutput, realOutput.copy()])


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
         
    


