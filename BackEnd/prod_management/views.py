import requests
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
import requests
from rest_framework import viewsets, status
from .models import UserSettings, UserSubscription
from .serializers import UserSettingsSerializer, UserSubscriptionSerializer
from api.views import isSessionActive
from user_auth.models import CustomUser, UserData
from django.contrib.sessions.models import Session
from django.utils import timezone
import stripe

stripe.api_key = "sk_test_51NPcYzLPNbsO0xpZ3ypmarjukmXpUaySegVecBCiZEcfbiUrBxeuXBQU8QiafXpARoIUKdU2uqzdifzly9DlWedt00aO6ZevFh"


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
        output = UserSettings.objects.get(Email=user_email)
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

    user = CustomUser.objects.get(email=data['Email'])
    if user is None:
        return Response({'error': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        # gonna have to change this to allow user to change email
    user_settings = UserSettings.objects.get(user=user)
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
    user = CustomUser.objects.get(email=data["Email"])
    user_data = UserData.objects.get(user=user)
    user_settings = UserSettings.objects.get(user=user)
    user_sub = UserSubscription.objects.get(user=user)
    # Check if user_settings
    if user_settings is None:
        return Response({'error': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    # Update user_settings
    session = Session.objects.get(session_key=sessionid)
    session.delete()
    user_settings.delete()
    user.delete()
    user_data.delete()
    if stripe.Customer.list(email=data["Email"]).data:
        customer = stripe.Customer.list(email=data["Email"]).data[0]
        if stripe.Subscription.list(customer=customer['id']).data:
            stripe.Subscription.delete(user_sub.stripe_subscription_id)
        stripe.Customer.delete(customer['id'])
    user_sub.delete()
    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
def BasicSubscription(request):
    sessionid = request.COOKIES.get('sessionid')
    # print(sessionid)
    # Check if session is active
    if isSessionActive(sessionid) == False:
        return Response({'error': 'Session expired'}, status=status.HTTP_400_BAD_REQUEST)
    # Get user from session
    email = request.query_params.get('email', None)
    payment_method = request.query_params.get('payment_method', None)
    if email is None:
        return Response({'error': 'Missing search query'}, status=status.HTTP_400_BAD_REQUEST)

    user_exists = CustomUser.objects.get(email=email)
    if user_exists is None:
        return Response({'error': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)

    subscription = UserSubscription.objects.get(user=user_exists)
    subscription.Basic = True
    # Set expiration to 1 month from now
    subscription.Basic_Expiration = timezone.now() + timezone.timedelta(days=30)
    subscription.Premium = False
    subscription.Premium_Expiration = None
    serializer = UserSubscriptionSerializer(subscription)

    # Stripe customer creation stuff
    if stripe.Customer.list(email=email).data:
        customer = stripe.Customer.list(email=email).data[0]
    else:
        customer = stripe.Customer.create(
            email=email,
            name=user_exists.first_name + " " + user_exists.last_name,
            description="Basic Subscription",
            payment_method=payment_method,
        )
    subscription.stripe_customer_id = customer['id']
    basic_id = "price_1NPcdBLPNbsO0xpZSX7Zrh0V"
    stripe.Subscription.create(
        customer=customer['id'],
        items=[
            {
                "price": basic_id,
            },
        ],
    )
    subscription.stripe_subscription_id = stripe.Subscription.list(
        customer=customer['id']).data[0]['id']
    subscription.save()

    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def PremiumSubscription(request):
    sessionid = request.COOKIES.get('sessionid')
    # print(sessionid)
    # Check if session is active
    if isSessionActive(sessionid) == False:
        return Response({'error': 'Session expired'}, status=status.HTTP_400_BAD_REQUEST)
    # Get user from session
    email = request.query_params.get('email', None)
    payment_method = request.query_params.get('payment_method', None)
    if email is None:
        return Response({'error': 'Missing search query'}, status=status.HTTP_400_BAD_REQUEST)

    user_exists = CustomUser.objects.get(email=email)
    if user_exists is None:
        return Response({'error': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)

    subscription = UserSubscription.objects.get(user=user_exists)
    subscription.Premium = True
    subscription.Basic = False
    subscription.Basic_Expiration = None
    # Set expiration to 1 month from now
    subscription.Premium_Expiration = timezone.now() + timezone.timedelta(days=30)
    serializer = UserSubscriptionSerializer(subscription)

    subscription.stripe_customer_id = customer['id']
    # Stripe customer creation stuff
    if stripe.Customer.list(email=email).data:
        customer = stripe.Customer.list(email=email).data[0]
    else:
        customer = stripe.Customer.create(
            email=email,
            name=user_exists.first_name + " " + user_exists.last_name,
            description="Premium Subscription",
            payment_method=payment_method,
        )

    premium_id = "price_1NPccdLPNbsO0xpZgksTl57Y"
    stripe.Subscription.create(
        customer=customer['id'],
        items=[
            {
                "price": premium_id,
            },
        ],
    )
    subscription.stripe_subscription_id = stripe.Subscription.list(
        customer=customer['id']).data[0]['id']
    subscription.save()

    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def CancelSubscription(request):
    sessionid = request.COOKIES.get('sessionid')
    # print(sessionid)
    # Check if session is active
    if isSessionActive(sessionid) == False:
        return Response({'error': 'Session expired'}, status=status.HTTP_400_BAD_REQUEST)
    # Get user from session
    query = request.query_params.get('email', None)
    if query is None:
        return Response({'error': 'Missing search query'}, status=status.HTTP_400_BAD_REQUEST)

    user_exists = CustomUser.objects.get(email=query)
    if user_exists is None:
        return Response({'error': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)

    subscription = UserSubscription.objects.get(user=user_exists)
    if subscription.Premium == False and subscription.Basic == False:
        return Response({'error': 'User does not have a subscription'}, status=status.HTTP_400_BAD_REQUEST)
    if subscription.Premium == True:
        subscription.Premium = False
        subscription.Premium_Expiration = None
    if subscription.Basic == True:
        subscription.Basic = False
        subscription.Basic_Expiration = None

    subscription.save()
    serializer = UserSubscriptionSerializer(subscription)

    # Stripe customer creation stuff
    if stripe.Customer.list(email=query).data:
        customer = stripe.Customer.list(email=query).data[0]
    else:
        return Response({'error': 'User does not have a subscription'}, status=status.HTTP_400_BAD_REQUEST)

    stripe.Subscription.delete(subscription.stripe_subscription_id)

    return Response(serializer.data, status=status.HTTP_200_OK)
