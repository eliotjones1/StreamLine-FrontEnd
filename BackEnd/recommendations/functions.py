import requests
import json
from rest_framework.response import Response
from rest_framework import generics, status
import pandas as pd
import numpy as np
from .models import *
from .serializers import *
from surprise import Reader, Dataset, SVD
from user_auth.models import CustomUser
from api.functions import *

DATA_HAS_BEEN_GENERATED = 0

def returnData(target_user_id):
    cur_ratings = MediaRatings.objects.all().values()
    df = pd.DataFrame.from_records(cur_ratings)
    df = df.drop(columns = ['id', 'media_type'])

    reader = Reader(rating_scale=(1, 5))

    data = Dataset.load_from_df(df[["media_id", "rating", "user_id"]], reader)
    trainset = data.build_full_trainset()

    algo = SVD()
    algo.fit(trainset)

    target_inner_id = trainset.to_inner_uid(target_user_id)
    similar_users = algo.get_neighbors(target_inner_id, 5)
    similar_user_ids = [trainset.to_raw_uid(inner_id) for inner_id in similar_users]

    recommendation_ids = []
    for user_id in similar_user_ids:
        user_recs = algo.get_top_n(trainset.ur[trainset.to_inner_uid(user_id)], n=5)
        for rec in user_recs:
            recommendation_ids.extend(rec[0])
    recs = []
    for id in recommendation_ids:
        if MediaRatings.objects.filter(media_id = id, user_id = target_user_id).exists():
            recommendation_ids.remove(id)
        if MediaRatings.objects.get(media_id = id, user_id = 1).type == "tv":
            url = "https://api.themoviedb.org/3/tv/" + str(id) + "?language=en-US"

            headers = {
                "accept": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NWNkNTI3OWYxN2M2NTkzMTIzYzcyZDA0ZTBiZWRmYSIsInN1YiI6IjY0NDg4NTgzMmZkZWM2MDU3M2EwYjk3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VXG36aVRaprnsBeXXhjGq6RmRRoPibEuGsjkgSB-Q-c"
            }

            response = requests.get(url, headers=headers)
            show = response.json()
            streaming_providers = getStreamingProviderShow(show['id'])
            recs.append({
                "title": show["Title"],
                'release_date': show['first_air_date'],
                'image': show['poster_path'],
                'rating': show['vote_average'],
                'streaming_providers': streaming_providers if streaming_providers != None else "Not Available",
                'type': 'TV Series'
            })
        else:
            url = "https://api.themoviedb.org/3/movie/" + str(id) + "?language=en-US"
            headers = {
                "accept": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NWNkNTI3OWYxN2M2NTkzMTIzYzcyZDA0ZTBiZWRmYSIsInN1YiI6IjY0NDg4NTgzMmZkZWM2MDU3M2EwYjk3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VXG36aVRaprnsBeXXhjGq6RmRRoPibEuGsjkgSB-Q-c"
            }
            response = requests.get(url, headers=headers)
            movie = response.json()
            streaming_providers = getStreamingProviderMovie(movie['id'])
            recs.append({
                'title': movie['title'],
                'release_date': movie['release_date'],
                'image': movie['poster_path'],
                'rating': movie['vote_average'],
                'streaming_providers': streaming_providers if streaming_providers != None else "Not Available",
                'type': 'Movie'
            })
    return recs


def generateData(page_input):
    if DATA_HAS_BEEN_GENERATED == 1:
        print("Data has been generated already")
        return 0
    else:
        #get all users
        users = CustomUser.objects.all()
        #get all media

        # Get popular movies from TMDB

        url = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=" + page_input
        print(url)

        headers = {
            "accept": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NWNkNTI3OWYxN2M2NTkzMTIzYzcyZDA0ZTBiZWRmYSIsInN1YiI6IjY0NDg4NTgzMmZkZWM2MDU3M2EwYjk3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VXG36aVRaprnsBeXXhjGq6RmRRoPibEuGsjkgSB-Q-c"
        }

        response_movies = requests.get(url, headers=headers)


        url = "https://api.themoviedb.org/3/tv/popular?language=en-US&page=" + page_input

        headers = {
            "accept": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NWNkNTI3OWYxN2M2NTkzMTIzYzcyZDA0ZTBiZWRmYSIsInN1YiI6IjY0NDg4NTgzMmZkZWM2MDU3M2EwYjk3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VXG36aVRaprnsBeXXhjGq6RmRRoPibEuGsjkgSB-Q-c"
        }

        response_tv = requests.get(url, headers=headers)
        movie_pop = response_movies.json()
        tv_pop = response_tv.json()

        top_movies = movie_pop['results']
        top_tv = tv_pop['results']

        # Create a list of all the media
        # For each entry in media_list
        # for each user in the database
        # Generate a random number between 1 and 10 from normal distribution centered around vote_average of media
        # Create a new MediaRatings entry with the user, media, and rating
        # Save the entry

        for entry in top_movies:
            for user in users:
                # Generate a random number between 1 and 10 from normal distribution centered around vote_average of media
                rating = np.random.normal(entry['vote_average'], 1)                
                new = MediaRatings()
                new.media_id = entry['id']
                new.user_id = user.to_json()
                new.rating = rating
                new.type = "movie"
                # Save the entry
                new.save()
            if 'title' in entry:
                print(entry['title'] + " was a success!")
            else:
                print(entry['name'] + " was a success!")

        for entry in top_tv:
            for user in users:
                rating = np.random.normal(entry['vote_average'], 1)
                new = MediaRatings()
                new.media_id = entry['id']
                new.user_id = user.to_json()
                new.rating = rating
                new.type = "tv"
                new.save()
            if 'title' in entry:
                print(entry['title'] + " was a success!")
            else:
                print(entry['name'] + " was a success!")

        return 1










