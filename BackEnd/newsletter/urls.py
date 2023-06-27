from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('getAllPosts/', getAllPosts.as_view()),
    path('getPost/', getPost.as_view()),
]
