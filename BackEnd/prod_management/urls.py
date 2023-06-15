from django.urls import path
from .views import *

urlpatterns = [
    path('products/', getProducts.as_view(), name='products-list'),
]