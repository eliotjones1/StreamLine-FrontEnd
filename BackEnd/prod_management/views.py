from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
import requests



class getProducts(generics.ListAPIView):
    def get(self, request):
        
        # Expects search query to be a string "get_products"
        search_query = request.query_params.get('search', None)
        if search_query is None or search_query != "get_products":
            return Response({'error': 'Missing search query'}, status=status.HTTP_400_BAD_REQUEST)
        
        headers = {
            'X-PAYPAL-SECURITY-CONTEXT': '{"consumer":{"accountNumber":1181198218909172527,"merchantId":"5KW8F2FXKX5HA"},"merchant":{"accountNumber":1659371090107732880,"merchantId":"2J6QB8YJQSJRJ"},"apiCaller":{"clientId":"AdtlNBDhgmQWi2xk6edqJVKklPFyDWxtyKuXuyVT-OgdnnKpAVsbKHgvqHHP","appId":"APP-6DV794347V142302B","payerId":"2J6QB8YJQSJRJ","accountNumber":"1659371090107732880"},"scopes":["https://api-m.paypal.com/v1/subscription/.*","https://uri.paypal.com/services/subscription","openid"]}',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }

        params = (
                ('page_size', '2'),
                ('page', '1'),
                ('total_required', 'true'),
        )

        response = requests.get('https://api-m.sandbox.paypal.com/v1/catalogs/products', headers=headers, params=params)
        data = response.json()
        return Response(data)

