import json

from django.shortcuts import render
from .models import *
from .serializers import *

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import HTTP_401_UNAUTHORIZED, HTTP_200_OK, HTTP_404_NOT_FOUND, HTTP_400_BAD_REQUEST, HTTP_201_CREATED
from rest_framework import status
from rest_framework import viewsets

# Create your views here.


# Get all the details of a product
# @api_view(["GET"])
# def get_product(request):
#     try:
#         new_list = []
#         categories = Category.objects.all()
#         # products = Product.objects.all()
#         # category_serializer = CategorySerializer(categories, many=True)
#         # product_serializer = ProductSerializer(products, many=True)
#         # serializer = category_serializer.data+product_serializer.data
#         # print("r", serializer)
#         # print("c", category_serializer.data)
#         # print("p", product_serializer.data)
#
#         for x in categories:
#             print(x)
#             products = Product.objects.all().filter(category=x)
#             print(products)
#             categories = Category.objects.all().filter(type=x)
#             print('categories', categories)
#             category_serializer = CategorySerializer(categories, many=True)
#             print("category_serializer", category_serializer)
#
#             serializer = ProductSerializer(products, many=True,)
#             # serializer.data['type']= x
#             print("serializer", serializer)
#             new_list.append(category_serializer.data)
#             new_list.append(serializer.data)
#
#         return Response(data={"status": "Success", "message": "Products found", "data": {"products": new_list}},
#                         status=HTTP_200_OK)
#     except Exception as e:
#         return Response(data={"status": "Error", "message": "Get Product Failed", "data": {"errors": str(e)}},
#                         status=HTTP_200_OK)


@api_view(["GET"])
def get_category(request):
    try:
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)

        return Response(data={"status": "Success", "message": "Products found", "data": {"menuItems": serializer.data}},
                        status=HTTP_200_OK)
    except Exception as e:
        return Response(data={"status": "Error", "message": "Get Product Failed", "data": {"errors": str(e)}},
                        status=HTTP_200_OK)


class Productsclass(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class Categoryclass(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


@api_view(["POST"])
def add_category(request):
    if request.method == "POST":
        try:
            print(json.loads(request.data))
            print(request.data)
            print(request.POST['name'])
            temp = json.dumps(request.data)
            print(temp)

            size_serializer = SizeSerializer(data=request.data)
            if size_serializer.is_valid():
                size_serializer.save()
            serializer = AddCategorySerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(data={'message': 'Category Inserted', 'Category': serializer.data}, status=HTTP_201_CREATED)
            else:
                return Response(data={'message': 'Category Already Exists', 'Category': serializer.data}, status=HTTP_401_UNAUTHORIZED)

        except Exception as e:
            return Response(
                data={"status": "Error", "message": "Error occurred while in saving Category", "data": {"error": str(e)}},
                status=HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_customs(requests, id):
    try:
        products = Product.objects.get(id=id)
        productobjserializer = ProductCustomizationSerializer(products)

        # productsize_id = ProductSize.objects.filter(id=id)
        # # print(productsize_id)
        # for x in productsize_id:
        #     # print(x.size)
        #     sizeobj = Size.objects.filter(size_name=x.size)
        # # for y in sizeobj:
        # #     print(y)
        # #     # print(sizeobj)
        # # sizeobjserializer = SizeSerializer(sizeobj, many=True)
        # # print('sizeobjserializer', sizeobjserializer)
        #
        # for z in productsize_id:
        #     productobj = Product.objects.filter(name=z.product)
        #     # print("productobj", productobj)
        # productobjserializer = ProductCustomizationSerializer(productobj, many=True)
        # print('productobjserializer', productobjserializer)

        # serializer = CustomizationSerializer(productobj, many=True)
        # print(serializer)

        return Response(data={"status": "Success", "message": "Products found", "data":  productobjserializer.data},
                        status=HTTP_200_OK)
    except Exception as e:
        return Response(data={"status": "Error", "message": "Get Product Failed", "data": {"errors": str(e)}},
                        status=HTTP_200_OK)


@api_view(["GET"])
def get_addons(requests, size_id):
    try:
        # products = Size.objects.get(id=size_id)
        sizes = Size.objects.filter(id=size_id)
        addonserializer = GetAddonsSerializer(sizes, many=True)

        return Response(data={"status": "Success", "message": "Addons found", "data":  addonserializer.data},
                        status=HTTP_200_OK)
    except Exception as e:
        return Response(data={"status": "Error", "message": "Fetching Addons Failed", "data": {"errors": str(e)}},
                        status=HTTP_400_BAD_REQUEST)

