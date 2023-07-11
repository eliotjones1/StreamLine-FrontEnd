from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('search/', ListMedia.as_view(), name='all-media'),
    path('search/all/', returnAll.as_view(), name='return-all'),
    path('optimize/', runOptimization, name='optimize'),
    path('saveBudget/', saveBudget, name='saveBudget'),
    path('saveMedia/', saveMedia, name='saveMedia'),
    path('saveBundle/', saveBundle, name='saveBundle'),
    path('returnData/', returnUserData.as_view(), name="return_data"),
    path('getProgress/', getProgress, name="get_progress"),
]
