from django.urls import path
from django.contrib import admin
from .views import *
from .schedule_views import *

urlpatterns = [
    path('settings/', ReturnSettings.as_view(), name='user-settings'),
    path('settings/update/', UpdateSettings, name='update-settings'),
    path('settings/delete/', deleteAccount, name='delete-account'),
    path('subscribe/basic/', BasicSubscription, name='basic-subscription'),
    path('subscribe/premium/', PremiumSubscription, name='premium-subscription'),
    path('subscribe/cancel/', CancelSubscription, name='cancel-subscription'),
    path('subscriptions/create/', createSubscription, name='create-subscription'),
    path('subscriptions/remove/', deleteSubscription, name='remove-subscription'),
    path('subscriptions/view/', getSubscriptions.as_view(), name='view-subscriptions'),
    path('subscriptions/action/', actionItems.as_view(), name='action-subscriptions'),
    path('subscriptions/set-choice/', handleSelection, name='set-choice'),
]