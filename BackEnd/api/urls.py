from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('search/all/', returnAll.as_view(), name='return-all'),
    path('optimize/', runOptimization, name='optimize'),
    path('saveBudget/', saveBudget, name='saveBudget'),
    path('saveMedia/', saveMedia, name='saveMedia'),
    path('removeMedia/', removeMedia, name='removeMedia'),
    path('clearAll/', clearMedia, name='saveService'),
    path('saveBundle/', saveBundle, name='saveBundle'),
    path('returnData/', returnUserData.as_view(), name="return_data"),
    path('getProgress/', getProgress, name="get_progress"),
    path('returnInfo/', returnInfo, name="return_info"),
    path('recent/', newlyReleased.as_view(), name="recent"),
    path('isAuthenticated/', isAuthenticated.as_view(), name='isAuthenticated'),
    path('staffpicks/', StaffPicks.as_view(), name='staffpicks'),
    path('showServices/', seeServices.as_view(), name='showServices'),
    path('getAllUpcoming/', getAllUpcoming.as_view(), name='getAllUpcoming'),
]
