from django.urls import path
from django.contrib import admin
from .views import *
from .schedule_views import *
from .subscription_views import *

urlpatterns = [
    path('settings/', ReturnSettings.as_view(), name='user-settings'),
    path('settings/update/', UpdateSettings, name='update-settings'),
    path('settings/delete/', deleteAccount, name='delete-account'),
    path('subscribe/basic/', BasicSubscription, name='basic-subscription'),
    path('subscribe/premium/', PremiumSubscription, name='premium-subscription'),
    path('subscribe/cancel/', CancelSubscription, name='cancel-subscription'),
    path('subscriptions/create/', createSubscription, name='create-subscription'),
    path('subscriptions/cancel/', cancelSubscription, name='remove-subscription'),
    path('subscriptions/view/', getSubscriptions.as_view(), name='view-subscriptions'),
    path('subscriptions/action/', actionItems.as_view(), name='action-subscriptions'),
    path('subscriptions/set-choice/', handleSelection, name='set-choice'),
    path('subscriptions/search/', AvailSubs.as_view(), name='search-subscriptions'),
    path('tosCompliance/', checkTOSStatus.as_view(), name='tos-compliance'),
    path('tosCompliance/update/', agreeTOS, name='update-tos-compliance'),
    path('subscriptions/generateBundle/', generateBundle, name='create-bundle'),
    path('subscriptions/upcoming/', getMyUpcoming.as_view(), name='get-upcoming'),
    path('contact/', ContactFormSub, name='contact-us'),
]