import requests
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .functions import *
import cvxpy as cp
import numpy as np
import pandas as pd
from django.core.cache import cache
from user_auth.models import CustomUser
from user_auth.serializers import *
from .models import *
from .serializers import *
from surprise import Reader, Dataset
from .functions import *
from api.functions import *


@api_view(['POST'])
def saveRating(request):
    data = request.data
    # Expect email to be at 0
    # Expect object at 1, rating at 2
    # Functionality: When the user, in their dashboard, removes something from their list, we prompt them to rate it. 
    # This rating corresponds to the TMDB ID of the media, and gets saved to their account. Have users rate by choosing a number 1-10.
    # Maybe prompt them to rate some stuff in the beginning, and then have them rate media as they remove them from their list.
    user = data[0]
    object = data[1]
    rating = data[2]
    user_exists = CustomUser.objects.get(email = user)

    if object["Type"] == "TV Series":
        object_id = getIDShow(object["Title"])
    else:
        object_id = getIDMovie(object["Title"])

    # If there is a MediaRatings entry with the same object_id and user, we want to override it with new information. 
    # Else, create a new entry
    if MediaRatings.objects.filter(media = object_id, user = user_exists).exists():
        current = MediaRatings.objects.get(media = object_id, user = user_exists)
        current.rating = rating
        current.save()
    else:
        new = MediaRatings(media = object_id, user = user_exists, rating = rating)
        new.save()

    return Response({"Status":"OK"})


class returnRecommendations(generics.ListAPIView):
     def get(self, request):
        query = request.query_params.get('email', None)
        if query is None:
            return Response({'error': 'Missing search query'}, status=status.HTTP_400_BAD_REQUEST)
        email = query
        user_exists = CustomUser.objects.get(email = email)
        # If user doesn't exist throw an error
        if not user_exists:
            return Response({'error': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            recs = returnData(user_exists.id)
            sorted_recs = sorted(recs, key = lambda k: k['vote_average'], reverse = True)
            top_five = sorted_recs[:5]
            return Response(top_five, status=status.HTTP_200_OK)


class generate(generics.ListAPIView):
    def get(self, request):
        query = request.query_params.get('generate', None)
        if query is None:
            return Response({'error': 'Missing search query'}, status=status.HTTP_400_BAD_REQUEST)
        elif query == '1':
            for i in range(1,26):
                page_input = str(i)
                generateData(page_input)
            return Response({'Status': 'OK'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Query set to 0'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def saveEmail(request):
    email = request.data
    new_email = UserEmail(email=email)
    new_email.save()
    return Response(status=status.HTTP_200_OK)