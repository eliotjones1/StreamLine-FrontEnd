from django.urls import path
from django.contrib import admin
from .views import *

urlpatterns = [
    path('settings/', ReturnSettings.as_view(), name='user-settings'),
    path('settings/update/', UpdateSettings, name='update-settings'),
    path('settings/delete/', deleteAccount, name='delete-account')
]