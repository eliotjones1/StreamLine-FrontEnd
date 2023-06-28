from django.shortcuts import render
from django.contrib.auth import get_user_model, logout, authenticate
from django.core.exceptions import ImproperlyConfigured
from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.contrib.sessions.backends.db import SessionStore
from django.contrib.sessions.models import Session

from . import serializers
from .utils import get_and_authenticate_user, create_user_account
from .models import CustomUser, UserData
# Create your views here.

User = get_user_model()

class AuthViewSet(viewsets.GenericViewSet):
    permission_classes = [AllowAny, ]
    serializer_class = serializers.EmptySerializer
    serializer_classes = {
        'login': serializers.UserLoginSerializer,
        'register': serializers.UserRegisterSerializer,
        'password_change': serializers.PasswordChangeSerializer,
    }
    queryset = CustomUser.objects.all()

    @action(methods=['POST', ], detail=False)
    def login(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = get_and_authenticate_user(**serializer.validated_data)

        # Create a session for the user
        session = SessionStore()
        session['user'] = user.email
        session.save()
        data = serializers.AuthUserSerializer(user).data
        response = Response(data=data, status=status.HTTP_200_OK)
        response.set_cookie('sessionid', session.session_key, httponly=True, samesite='None', secure=True)
        print(response.cookies)
        return response

    @action(methods=['POST', ], detail=False)
    def register(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = create_user_account(**serializer.validated_data)
        data = serializers.AuthUserSerializer(user).data
        user = data["email"]
        user_exists = CustomUser.objects.get(email = user)
        user_data = UserData(user = user_exists, budget = "0", bundle = {"Images":[], "Movies_and_TV_Shows":[]}, media = [])
        user_data.save()
       
        session = SessionStore()
        session['user'] = user
        session.save()
        response = Response(data=data, status=status.HTTP_201_CREATED)
        response.set_cookie('sessionid', session.session_key, httponly=True, samesite='Strict', secure=True)
        return response


    @action(methods=['POST', ], detail=False)
    def logout(self, request):
        # Delete the session
        session_key = request.COOKIES.get('sessionid')
        print(session_key)
        session = Session.objects.get(session_key=session_key)
        session.delete()
        logout(request)
        data = {'success': 'Sucessfully logged out'}
        return Response(data=data, status=status.HTTP_200_OK)

    @action(methods=['POST'], detail=False, permission_classes=[IsAuthenticated, ])
    def password_change(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        request.user.set_password(serializer.validated_data['new_password'])
        request.user.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


    def get_serializer_class(self):
        if not isinstance(self.serializer_classes, dict):
            raise ImproperlyConfigured("serializer_classes should be a dict mapping.")

        if self.action in self.serializer_classes.keys():
            return self.serializer_classes[self.action]
        return super().get_serializer_class()
