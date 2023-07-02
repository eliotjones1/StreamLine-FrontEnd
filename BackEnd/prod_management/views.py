import requests
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
import requests
from rest_framework import viewsets, status
from .models import UserSettings
from .serializers import UserSettingsSerializer
from api.views import isSessionActive
from user_auth.models import CustomUser, UserData
from django.contrib.sessions.models import Session



class ReturnSettings(generics.ListAPIView):
    def get(self, request):
        sessionid = request.COOKIES.get('sessionid')
        # print(sessionid)
        # Check if session is active
        if isSessionActive(sessionid) == False:
            return Response({'error': 'Session expired'}, status=status.HTTP_400_BAD_REQUEST)
        # Get user from session
        query = request.query_params.get('email', None)
        if query is None:
            return Response({'error': 'Missing search query'}, status=status.HTTP_400_BAD_REQUEST)
        
        user_email = query
        output = UserSettings.objects.get(Email = user_email)
        serializer = UserSettingsSerializer(output)
        return Response(serializer.data)


# Update UserSettings 
@api_view(['POST'])
def UpdateSettings(request):
    sessionid = request.COOKIES.get('sessionid')
    # print(sessionid)
    # Check if session is active
    if isSessionActive(sessionid) == False:
        return Response({'error': 'Session expired'}, status=status.HTTP_400_BAD_REQUEST)
    # Get user from session
    data = request.data
    user = CustomUser.objects.get(email = data['Email'])
    user_settings = UserSettings.objects.get(user = user)
    # Check if user_settings
    if user_settings is None:
        return Response({'error': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    # Update user_settings
    user_settings.Email = user
    user_settings.First_Name = data['First_Name']
    user_settings.Last_Name = data['Last_Name']
    user_settings.Street_Address = data['Street_Address']
    user_settings.City = data['City']
    user_settings.State_Province = data['State_Province']
    user_settings.Country = data['Country']
    user_settings.Postal_Code = data['Postal_Code']
    user_settings.Newsletter = data['Newsletter']
    user_settings.Promotions = data['Promotions']
    user_settings.Push_Notifications = data['Push_Notifications']
    user_settings.save()
    serializer = UserSettingsSerializer(user_settings)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def deleteAccount(request):
    sessionid = request.COOKIES.get('sessionid')
    # print(sessionid)
    # Check if session is active
    if isSessionActive(sessionid) == False:
        return Response({'error': 'Session expired'}, status=status.HTTP_400_BAD_REQUEST)
    # Get user from session
    data = request.data
    user = CustomUser.objects.get(email = data["Email"])
    user_data = UserData.objects.get(user = user)
    user_settings = UserSettings.objects.get(user = user)
    # Check if user_settings
    if user_settings is None:
        return Response({'error': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    # Update user_settings
    session = Session.objects.get(session_key = sessionid)
    session.delete()
    user_settings.delete()
    user.delete()
    user_data.delete()
    return Response(status=status.HTTP_200_OK)
    
    