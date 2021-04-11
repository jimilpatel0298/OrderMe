import json

from django.http import HttpResponse
from django.shortcuts import render
from .models import *
from .serializers import *
from django.core import serializers

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import HTTP_401_UNAUTHORIZED, HTTP_200_OK, HTTP_404_NOT_FOUND, HTTP_400_BAD_REQUEST, HTTP_201_CREATED
from rest_framework import status
from rest_framework import viewsets

# Create your views here.


class Productsclass(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class Categoryclass(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


# @api_view(["POST"])
# def add_category(request):
#     if request.method == "POST":
#         try:
#             # print(json.loads(request.data))
#             print(request.data)
#             print(request.POST['name'])
#             # temp = json.dumps(request.data)
#             # print(temp)
#
#             size_serializer = SizeSerializer(data=request.data)
#             if size_serializer.is_valid():
#                 size_serializer.save()
#             serializer = AddCategorySerializer(data=request.data)
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response(data={'message': 'Category Inserted', 'Category': serializer.data}, status=HTTP_201_CREATED)
#             else:
#                 return Response(data={'message': 'Category Already Exists', 'Category': serializer.data}, status=HTTP_401_UNAUTHORIZED)
#
#         except Exception as e:
#             return Response(
#                 data={"status": "Error", "message": "Error occurred while in saving Category", "data": {"error": str(e)}},
#                 status=HTTP_400_BAD_REQUEST)


# Get the details of all product along with category
@api_view(["GET"])
def product_details(request):
    try:
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)

        return Response(data={"status": "Success", "message": "Products found", "data": {"menuItems": serializer.data}},
                        status=HTTP_200_OK)
    except Exception as e:
        return Response(data={"status": "Error", "message": "Get Product Failed", "data": {"errors": str(e)}},
                        status=HTTP_200_OK)


# get all the sizes of a product
@api_view(["GET"])
def get_sizes(requests, id):
    try:
        products = Product.objects.get(id=id)
        size_serializer = GetSizeSerializer(products)

        return Response(data={"status": "Success", "message": "Products found", "data":  size_serializer.data},
                        status=HTTP_200_OK)
    except Exception as e:
        return Response(data={"status": "Error", "message": "Get Product Failed", "data": {"errors": str(e)}},
                        status=HTTP_200_OK)


# get all the addons of a particular size
@api_view(["GET"])
def get_addons(requests, size_id):
    try:
        sizes = Size.objects.filter(id=size_id)
        addonserializer = GetAddonsSerializer(sizes, many=True)
        # addonserializer = serializers.serialize('json', sizes)
        # return HttpResponse(addonserializer, content_type="text/json-comment-filtered")
        return Response(data={"status": "Success", "message": "Addons found", "data":  addonserializer.data},
                        status=HTTP_200_OK)
    except Exception as e:
        return Response(data={"status": "Error", "message": "Fetching Addons Failed", "data": {"errors": str(e)}},
                        status=HTTP_400_BAD_REQUEST)


# place a new order
@api_view(["POST"])
def place_order(request):
    if request.method == "POST":
        try:
            print(request.data)
            order = Order.objects.create(total=request.data['cartPrice'], paid=request.data['cartPrice'])
            person = Person.objects.create(name=request.data['contactDetails']['name'], phone=request.data['contactDetails']['phone'])
            order.person = person
            order.save()

            for item in request.data['cartItems']:
                orderitem = OrderItem.objects.create(
                    product_id=item['id'],
                    order_id=order.id,
                    size_id=item['size']['id'],
                    total=item['totalPrice'],
                )

                if item['addons'] is not None:
                    for addon in item['addons']:
                        addon_obj = AddonOrderItem.objects.create(orderitem_id=orderitem.id, addon_id=addon['id'])

            return Response(data={'message': 'Order Placed', 'Order id': order.id}, status=HTTP_201_CREATED)

        except Exception as e:
            print(str(e))
            return Response(
                data={"status": "Error", "message": "Error occurred while in saving Category", "data": {"error": str(e)}},
                status=HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_order_details(requests, order_id):
    try:
        orders = Order.objects.get(id=order_id)
        serializer = serializers.serialize('json', orders)
        return HttpResponse(serializer, content_type="text/json-comment-filtered")
        # return Response(data={"status": "Success", "message": "Addons found", "data":  serializer.data},
        #                 status=HTTP_200_OK)
    except Exception as e:
        return Response(data={"status": "Error", "message": "Fetching Addons Failed", "data": {"errors": str(e)}},
                        status=HTTP_400_BAD_REQUEST)
