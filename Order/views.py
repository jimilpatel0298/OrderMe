from django.shortcuts import render
from .models import *
from .serializers import *

from django.http import QueryDict
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.conf import settings

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import HTTP_401_UNAUTHORIZED, HTTP_200_OK, HTTP_404_NOT_FOUND, HTTP_400_BAD_REQUEST
from rest_framework import status

# Create your views here.


# Get all the details of a product
@api_view(["GET"])
def get_product(request):
    try:
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(data={"status": "Success", "message": "Products found", "data": {"products": serializer.data}},
                        status=HTTP_200_OK)
    except Exception as e:
        return Response(data={"status": "Error", "message": "Get Product Failed", "data": {"errors": str(e)}},
                        status=HTTP_200_OK)
