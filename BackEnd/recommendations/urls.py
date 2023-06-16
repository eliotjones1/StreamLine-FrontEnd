from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('generateData/', generate.as_view(), name='generateData'),
    path('saveRating/', saveRating, name='saveRating'),
    path('getRecommendations/', returnRecommendations.as_view(), name='returnRecommendations'),
    path('saveEmail/', saveEmail, name='saveEmail'),
]