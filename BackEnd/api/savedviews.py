import requests
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .functions import *
import numpy as np
import cvxpy as cp
import pandas as pd
from user_auth.models import UserData, CustomUser
from user_auth.serializers import UserDataSerializer

# Create your views here.
class ListMovies(generics.ListAPIView):
    def get(self, request):
        search_query = request.query_params.get('search', None)
        if search_query is None:
            return Response({'error': 'Missing search query'}, status=status.HTTP_400_BAD_REQUEST)
        
        title = search_query
        movies = getMovies(title)

        if movies == []:
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

        if shows == []:
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

        if movies == [] and shows == []:
            return Response({'error': 'Unable to fetch media'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        elif movies == []:
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
        elif shows == []:
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
    return Response([realOutput])


api_view(['POST'])
def runOptimization(request):
    data = request.data
    # remove "budget" from data
    budget = data[-1]
    data = data[:-1]


    providers, prices, services = modify_input(data)

    # insert dummy data to help find higher value bundles
    # dummy_outputs = []
    # dummy_services = ['HBO Max']
    # for dumy_service in dummy_services:
    #     output = {}
    #     output["Title"] = "Value Bundle"
    #     output["Subheader"] = "StreamLine Recommended"
    #     output["Movies_and_TV_Shows"] = []
    #     output["Streaming_Services"] = stream_opt
    #     output["Total_Cost"] = 0
    #     output["Movies_and_TV_Shows"] = watch_opt

    # extra_services = ['HBO Max', 'Freeform', 'c', 'd', 'e', 'f', 'g']
    # extra_prices = [3, 7, 9, 14, 15, 22, 43]
    extra_services_to_movies = {'Hulu': "White Men Can't Jump", 'Netflix': "Squid Game", "HBO Max": "Game of Thrones", "Amazon Prime Video": "Ticket to Paradise", "Disney Plus": "Marvel's Avengers", "fuboTV": "Yellowstone", "Funimation Now": "Mass Effect: Paragon Lost", "Peacock Premium": "Bupkis", "Apple TV Plus": "Ted Lasso", "DIRECTV": "Star Wars"} #, "Globo Play", "Acorn TV": , "VIX": , "YouTube Premium": , "DIRECTV": , "Paramount Plus,4.99": }
    stupid_fucking_dict = {"White Men Can't Jump" : "Movie", "Squid Game" : "TV Series", "Game of Thrones": "TV Series", "Ticket to Paradise": "Movie", "Marvel's Avengers": "TV Series", "Yellowstone": "TV Series", "Mass Effect: Paragon Lost": "Movie", "Bupkis": "TV Series", "Ted Lasso": "TV Series", "Star Wars": "Movie"}
    # extra_services_to_movies = {'Hulu': "White Men Can't Jump", 'Netflix': "Squid Game"}
    # Possible ones: AsianCrush: Aachi and Ssipak, .00000001, Hoopla: Penguin Highway, .000000001

    extra_services = list(extra_services_to_movies)
    extra_prices = [7.99, 6.99, 9.99, 8.99, 8.00, 74.99, 7.99, 4.99, 6.99, 64.99] #, 13.99, 6.99, 6.99, 11.99, 4.99]
    # extra_prices = [7.99, 6.99]
    for i in range(len(extra_services)):
        if extra_services[i] not in services:
            prices[extra_services[i]] = extra_prices[i]
            services.append(extra_services[i])
    

    # print("///////////////////////////////////////////////////////////////////////////////////////////////", providers, prices, services)


    def helper(providers, prices, services, budget):
        if len(services) == 0:
            return 0

        watchlist = list(providers.keys())

        if len(watchlist) == 0:
            return 0
            # return Response(["No movies available"], status=status.HTTP_400_BAD_REQUEST)
        x = {m: cp.Variable(boolean=True) for m in watchlist}
        y = {s: cp.Variable(boolean=True) for s in services}

        objective = cp.sum(1 - cp.vstack([x[m] for m in watchlist]))

        # print("##################################################################################################", providers, "\n", prices, "\n", services )


        constraints = [
            cp.sum(cp.vstack([y[s] * prices[s] for s in services])) <= budget,
            cp.sum(cp.vstack([y[s] * prices[s] for s in services])) >= (budget - 1),
            
        ]
        for m in providers:
            #print(m)
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
        

        output = {}
        output["Title"] = "Value Bundle"
        output["Subheader"] = "StreamLine recommended"
        output["Movies_and_TV_Shows"] = []
        output["Streaming_Services"] = stream_opt
        output["Total_Cost"] = 0
        output["Movies_and_TV_Shows"] = watch_opt
        
        for s in stream_opt:
            # if w[s].value == 1:
            
                # output["Streaming_Services"].append(s)
            output["Total_Cost"] += prices[s]
                
        return output#, stream_opt, w
    
    # Make copies so we don't have a chance of messing with changed data
    providers_orig = providers.copy()
    services_orig = services.copy()
    prices_orig = prices.copy()
    providers_copy = providers_orig.copy()
    services_copy = services_orig.copy()
    prices_copy = prices_orig.copy()
    
    # Run the first iteration of the algorithm. If it returns 0, then there are no bundles, and return the empty dict
    # output, stream_opt, w = helper(providers, prices, services, budget)
    # if output == 0:
    #     return Response([{}])
    all_outputs = []
    # all_outputs.append(output)

    budget_rounded_down = int(budget//1)
    for i in range(0, budget_rounded_down):
        output = helper(providers, prices, services, budget - i)
        if output != 0 and (output not in all_outputs): 
            if output["Movies_and_TV_Shows"] != []:
                if output["Total_Cost"] == 0: 
                    output["Total_Cost"] = 0.00000001
                all_outputs.append(output)
    if len(all_outputs) == 0:
        return Response(["No Bundles"])


    # sorted_outputs = sorted(all_outputs, key=lambda d: (-len(d["Movies_and_TV_Shows"]), d["Total_Cost"])) 

    # print("#############################################################################################################", all_outputs, len(all_outputs))
    # x = 5 + 's'

    
    # sorted_outputs_efficiency = sorted(all_outputs, key=lambda d: (-(len(d["Movies_and_TV_Shows"]) / d["Total_Cost"]), -len(d["Movies_and_TV_Shows"]))) 
    # for i in range(len(all_outputs)):
    #     all_outputs[i]["Type"] = []
    #     for media in all_outputs[i]["Movies_and_TV_Shows"]:
    #         print(media)
    #         found = 0
    #         for object in data:
    #             if media == object["title"]:
    #                 all_outputs[i]["Type"].append(object["type"])
    #                 found = 1
    #                 print(found)
    #         if media in stupid_fucking_dict.keys() and found == 0:
    #             all_outputs[i]["Type"].append(stupid_fucking_dict[media])


    realOutputs = []
    realOutputList = []
    if len(all_outputs) == 1:
        #print("#############################################################################################################all1output", all_outputs)
        all_outputs[0]["Type"] = []
        for media in all_outputs[0]["Movies_and_TV_Shows"]:
            #print(media)
            found = 0
            for object in data:
                if media == object["title"]:
                    all_outputs[0]["Type"].append(object["type"])
                    found = 1
                    #print(found)
            if media in stupid_fucking_dict.keys() and found == 0:
                all_outputs[0]["Type"].append(stupid_fucking_dict[media])
        realOutputs.append(getServiceImages(all_outputs[0]))
        return Response(realOutputs)
    if len(all_outputs) == 2:
        #print("#############################################################################################################all2outputs", all_outputs)
        sorted_outputs_efficiency = sorted(all_outputs, key=lambda d: (-(len(d["Movies_and_TV_Shows"]) / d["Total_Cost"]), -len(d["Movies_and_TV_Shows"]))) 
        
        for o in sorted_outputs_efficiency:
            realOutputList.append(o)
        
        for o in realOutputList:
            to_be_removed = []
            services = o["Streaming_Services"]
            for service in services:
                if service in extra_services_to_movies:
                    if extra_services_to_movies[service] not in o["Movies_and_TV_Shows"]:
                        o["Movies_and_TV_Shows"].append(extra_services_to_movies[service])
                        to_be_removed.append(extra_services_to_movies[service])

            o["Type"] = []
            for media in o["Movies_and_TV_Shows"]:
                #print(media)
                found = 0
                for object in data:
                    if media == object["title"]:
                        o["Type"].append(object["type"])
                        found = 1
                        #print(found)
                if media in stupid_fucking_dict.keys() and found == 0:
                    o["Type"].append(stupid_fucking_dict[media])

            realOutputs.append(getServiceImages(o))
            for movie_or_tv_show in to_be_removed:
                realOutputs[-1]["Movies_and_TV_Shows"].remove(movie_or_tv_show)

        basic = sorted(realOutputs, key=lambda d: (-len(d["Movies_and_TV_Shows"]), d["Total_Cost"], ))[0]
        realOutputs.remove(basic)
        most_money = realOutputs[0]
        most_money["Title"] = "Closest to Your Budget"
        most_money["Subheader"] = "Don't mind spending a litte extra?"

        VeryRealOutputs = []
        VeryRealOutputs.append(most_money)
        VeryRealOutputs.append(basic)

        return Response(VeryRealOutputs)
    
    if len(all_outputs) >= 3:
        #print("#############################################################################################################alloutputs", all_outputs)


        sorted_outputs_efficiency = sorted(all_outputs, key=lambda d: (-(len(d["Movies_and_TV_Shows"]) / d["Total_Cost"]), -len(d["Movies_and_TV_Shows"]))) 
        realOutputList.append(sorted_outputs_efficiency[0])
        sorted_outputs_efficiency.remove(sorted_outputs_efficiency[0])

        sorted_outputs_most_movies = sorted(sorted_outputs_efficiency, key=lambda d: (-len(d["Movies_and_TV_Shows"]), d["Total_Cost"]))
        realOutputList.append(sorted_outputs_most_movies[0])
        sorted_outputs_most_movies.remove(sorted_outputs_most_movies[0])

        sorted_outputs_most_cost = sorted(sorted_outputs_most_movies, key=lambda d: (-d["Total_Cost"], -len(d["Movies_and_TV_Shows"])))
        realOutputList.append(sorted_outputs_most_cost[0])
        sorted_outputs_most_cost.remove(sorted_outputs_most_cost[0])


        for o in realOutputList:
            to_be_removed = []
            services = o["Streaming_Services"]
            for service in services:
                if service in extra_services_to_movies:
                    if extra_services_to_movies[service] not in o["Movies_and_TV_Shows"]:
                        o["Movies_and_TV_Shows"].append(extra_services_to_movies[service])
                        to_be_removed.append(extra_services_to_movies[service])
            
            o["Type"] = []
            for media in o["Movies_and_TV_Shows"]:
                print(media)
                found = 0
                for object in data:
                    if media == object["title"]:
                        o["Type"].append(object["type"])
                        found = 1
                if media in stupid_fucking_dict.keys() and found == 0:
                    o["Type"].append(stupid_fucking_dict[media])



            realOutputs.append(getServiceImages(o))
            for movie_or_tv_show in to_be_removed:
                realOutputs[-1]["Movies_and_TV_Shows"].remove(movie_or_tv_show)
            # realOutputs.append(getServiceImages(o))
        #print("llllllll", realOutputs)
        basic = sorted(realOutputs, key=lambda d: (-len(d["Movies_and_TV_Shows"]), d["Total_Cost"], ))[0]
        realOutputs.remove(basic)
        most_efficient = sorted(realOutputs, key=lambda d: (d["Total_Cost"], len(d["Movies_and_TV_Shows"])))[0]
        most_efficient["Title"] = "Efficiency Bundle"
        most_efficient["Subheader"] = "Most bang for your buck"
        most_money = sorted(realOutputs, key=lambda d: (-d["Total_Cost"], -len(d["Movies_and_TV_Shows"])))[0]
        most_money["Title"] = "Closest to Your Budget"
        most_money["Subheader"] = "Don't mind spending a litte extra?"

        VeryRealOutputs = []
        
        VeryRealOutputs.append(most_efficient)
        VeryRealOutputs.append(basic)
        VeryRealOutputs.append(most_money)
        




        #print("#############################################################################################################", VeryRealOutputs)
        #print(VeryRealOutputs[0] == VeryRealOutputs[1])
        return Response(VeryRealOutputs)


    # if the length is 0
    return Response(["No Bundles"])


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
         
    


