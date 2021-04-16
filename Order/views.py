import json
import time

from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse, StreamingHttpResponse, HttpResponseBadRequest, JsonResponse
from django.shortcuts import render
from django.core import serializers
from django.forms.models import model_to_dict

from .models import *
from .serializers import *

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import HTTP_401_UNAUTHORIZED, HTTP_200_OK, HTTP_404_NOT_FOUND, HTTP_400_BAD_REQUEST, HTTP_201_CREATED

# import jsonpickle

# Create your views here.


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
                category = Category.objects.get(type=item['category'])
                orderitem = OrderItem.objects.create(
                    category=category,
                    product_id=item['id'],
                    order_id=order.id,
                    size_id=item['size']['id'],
                    total=item['totalPrice'],
                )

                if item['addons'] is not None:
                    for addon in item['addons']:
                        addon_obj = AddonOrderItem.objects.create(orderitem_id=orderitem.id, addon_id=addon['id'])

            return Response(data={'message': 'Order Placed', 'Order_id': order.id}, status=HTTP_201_CREATED)

        except Exception as e:
            print(str(e))
            return Response(
                data={"status": "Error", "message": "Error occurred while in saving Category", "data": {"error": str(e)}},
                status=HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_order_details(requests):
    try:
        # orders = Order.objects.all()
        # print(orders)
        # order_serializer = serializers.serialize('json', orders, use_natural_foreign_keys=True,)
        #
        # order_item = OrderItem.objects.all()
        # print(order_item)
        # order_item_serializer = serializers.serialize('json', order_item, indent=2, use_natural_foreign_keys=True, use_natural_primary_keys=True,)
        # print('order_item_serializer', order_item_serializer)

        # all_serialized_objects = [order_serializer, order_item_serializer]
        # print('serialized', all_serialized_objects)
        # data = serializers.serialize('json', all_serialized_objects)
        # print(data)

        # all_objects = [*Order.objects.all(), *OrderItem.objects.all()]
        # data = serializers.serialize('json', all_objects, use_natural_foreign_keys=True, use_natural_primary_keys=True,)

        # serializers = CustomSerializer()
        # queryset = Order.objects.all()
        # data = serializers.serialize(queryset, fields=('id', 'person'))
        #
        # return HttpResponse(data, content_type="text/json-comment-filtered")

        obj = Person.objects.all()
        serializer = PersonSerializer(obj, many=True)
        return Response(data={"status": "Success", "message": "Addons found", "data":  serializer.data},
                        status=HTTP_200_OK)
    except Exception as e:
        return Response(data={"status": "Error", "message": "Fetching Addons Failed", "data": {"errors": str(e)}},
                        status=HTTP_400_BAD_REQUEST)


def event_stream():
    initial_data = ''
    try:
        while True:
            def f():
                def toDict(obj):
                    return model_to_dict(obj)

                dataObj = {
                    'contactDetails': {},
                    'order': {},
                    'orderItems': []
                }
                newOrder = Order.objects.last().id
                orderObj = Order.objects.get(id=newOrder)
                personObj = Person.objects.get(id=orderObj.person.id)
                orderItems = OrderItem.objects.filter(order=orderObj)

                dataObj['contactDetails'] = toDict(personObj)
                dataObj['order'] = {
                    'id': orderObj.id,
                    'status': orderObj.status,
                    'paid': orderObj.paid,
                    'total': orderObj.total
                }
                for order_item in orderItems:
                    temp_obj = {
                        'id': order_item.id,
                        'name': order_item.product.name,
                        'category': order_item.category.type,
                        'product': order_item.product.id,
                        'order': orderObj.id,
                        'total': order_item.total,
                        'itemSize': {
                            'id': order_item.size.id,
                            'name': order_item.size.name,
                            'price': order_item.size.price
                        },
                        'itemAddons': []
                    }
                    itemAddons = AddonOrderItem.objects.filter(orderitem=order_item)
                    for item_addon in itemAddons:
                        temp_addon = {
                            'id': item_addon.id,
                            'addon': item_addon.addon.id,
                            'name': item_addon.addon.name,
                            'price': item_addon.addon.price
                        }
                        temp_obj['itemAddons'].append(temp_addon)
                    dataObj['orderItems'].append(temp_obj)

                json_string = json.dumps(dataObj)
                print(dataObj)
                return json_string

            data = f()

            if not initial_data == data:
                yield "\ndata: {}\n\n".format(data)
                initial_data = data
            time.sleep(1)

    except Exception as e:
        print(str(e))


def get_latest_order(requests):
    try:
        response = StreamingHttpResponse(event_stream(), status=200)
        response['Content-Type'] = 'text/event-stream'
        response['Cache-Control'] = 'no-cache'
        return response
    except Exception as e:
        response = HttpResponseBadRequest('Invalid request: %s.\n' % str(e))
        return response


# update status of a order
@api_view(["PUT"])
def update_order_status(request, order_id):
    if request.method == "PUT":
        try:
            order = Order.objects.get(id=order_id)

        except Exception as e:
            return Response(
                data={"status": "Error", "message": "Order Not Found", "data": {"error": str(e)}},
                status=HTTP_404_NOT_FOUND)

        serializer = OrderUpdateSerializer(order, data=request.data)
        if serializer.is_valid():
            serializer.save()
            if request.data['status'] == 'paid':
                order.paid_status = True
                order.save()
            elif request.data['status'] == 'tobepaid':
                order.paid_status = False
                order.save()
            return Response(data={'message': 'Status Updated!', 'Order': serializer.data}, status=HTTP_200_OK)

