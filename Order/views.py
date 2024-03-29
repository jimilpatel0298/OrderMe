import datetime
import json
import time

from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse, StreamingHttpResponse, HttpResponseBadRequest, JsonResponse
from django.shortcuts import render, redirect
from django.core import serializers
from django.forms.models import model_to_dict

from .models import *
from .serializers import *

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import HTTP_401_UNAUTHORIZED, HTTP_200_OK, HTTP_404_NOT_FOUND, HTTP_400_BAD_REQUEST, HTTP_201_CREATED


# Create your views here.

manage_toggle = False

def check_time(request):
    current_time = datetime.datetime.now()
    formatedTime = current_time.strftime("%H:%M:%S")
    time = Time.objects.last()
    open_time = str(time.open_time)
    close_time = str(time.close_time)

    if open_time < formatedTime < close_time:
        return render(request, 'index.html')
    else:
        message = '<center><h1>Breadbites is currently closed !!!</h1><br> \n <h2>Open Time: <b>{}</b>&nbsp;&nbsp; ' \
                  'Close Time: <b>{}</b></h2></center>'.format(open_time, close_time)

        return HttpResponse(message)


# Get the current day
@api_view(["GET"])
def day(request):
    try:
        day = datetime.date.isoweekday(datetime.datetime.now()) % 7

        return Response(data={"day": day}, status=HTTP_200_OK)
    except Exception as e:
        return Response(data={"status": "Error", "message": "Get Day Failed", "data": {"errors": str(e)}},
                        status=HTTP_200_OK)


# Get the current day
@api_view(["POST"])
def check_pin(request):
    if request.method == "POST":
        try:
            pin = request.data['pin']
            passcode = Pin.objects.last()
            if pin == passcode.passcode:
                global manage_toggle
                manage_toggle = True
                return Response(data={"pin": True}, status=HTTP_200_OK)
            else:
                return Response(data={"pin": False}, status=HTTP_200_OK)
        except Exception as e:
            return Response(data={"status": "Error", "message": "Get Pin Failed", "data": {"errors": str(e)}},
                            status=HTTP_200_OK)


@api_view(["POST"])
def close_event_stream(request):
    if request.method == "POST":
        try:
            toggle = request.data['manage_toggle']
            if toggle:
                global manage_toggle
                manage_toggle = False
                return Response(status=HTTP_200_OK)

        except Exception as e:
            return Response(data={"status": "Error", "message": "Closing Event Stream Failed", "data": {"errors": str(e)}},
                            status=HTTP_400_BAD_REQUEST)


# Get the details of all product along with category
@api_view(["GET"])
def product_details(request):
    try:
        # categories = Category.objects.exclude(products__isnull=True).exclude(products__stock_out=True)
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
            person = Person.objects.create(name=request.data['contactDetails']['name'], phone=request.data['contactDetails']['phone'])
            order = Order.objects.create(total=request.data['totalPrice'], paid=request.data['cartPrice'], person=person)
            # order.save()

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

            return Response(data={'message': 'Order Placed', 'order_id': order.id, 'price': order.paid}, status=HTTP_201_CREATED)

            # # input time in seconds
            # t = 20  # 5 minutes
            # order_id = order.id
            # countdown(int(t), order_id)

        except Exception as e:
            print(str(e))
            return Response(
                data={"status": "Error", "message": "Error occurred while in saving Category", "data": {"error": str(e)}},
                status=HTTP_400_BAD_REQUEST)


# # define the countdown func.
# def countdown(t, order_id):
#     while t:
#         mins, secs = divmod(t, 60)
#         timer = '{:02d}:{:02d}'.format(mins, secs)
#         print(timer, end="\r")
#         order = Order.objects.get(id=order_id)
#         if order.paid_status == True:
#             break
#         else:
#             order.status = 'cancelled'
#             order.save()
#         time.sleep(1)
#         t -= 1


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

        obj = Person.objects.exclude(order__status='dispatched').exclude(order__status='cancelled')
        serializer = PersonSerializer(obj, many=True)
        return Response(data={"status": "Success", "message": "Addons found", "data":  serializer.data},
                        status=HTTP_200_OK)
    except Exception as e:
        return Response(data={"status": "Error", "message": "Fetching Addons Failed", "data": {"errors": str(e)}},
                        status=HTTP_400_BAD_REQUEST)


def event_stream():
    initial_data = ''
    order_id_number = 0

    try:
        print(manage_toggle)
        print(order_id_number)
        print(initial_data)
        if manage_toggle == False:
            json_string = json.dumps(-1)
            data = json_string
            if not initial_data == data:
                yield "\ndata: {}\n\n".format(data)
                initial_data = data
            time.sleep(2)

        while manage_toggle:
            def toDict(obj):
                return model_to_dict(obj)

            print(Order.objects.all().exists())
            if Order.objects.all().exists():
                newOrder = Order.objects.last().id
                print('inside 1st if')
                if order_id_number == 0 or order_id_number != newOrder:
                    print('inside 2nd if')
                    dataObj = {
                        'contactDetails': {},
                        'order': {},
                        'orderItems': []
                    }
                    orderObj = Order.objects.get(id=newOrder)

                    dataObj['order'] = {
                        'id': orderObj.id,
                        'status': orderObj.status,
                        'paid': orderObj.paid,
                        'total': orderObj.total,
                        'paidStatus': orderObj.paid_status
                    }

                    # if order_id_number == 0:
                    #     if dataObj['order']['status'] == 'paid' or dataObj['order']['status'] == 'cancelled' or dataObj['order']['status'] == 'dispatched' or dataObj['order']['status'] == 'prepared' or dataObj['order']['status'] == 'paylater':
                    #         time.sleep(1)
                    #     continue

                    order_id_number = newOrder

                    personObj = Person.objects.get(id=orderObj.person.id)
                    orderItems = OrderItem.objects.filter(order=orderObj)

                    dataObj['contactDetails'] = toDict(personObj)

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
                    data = json_string
                    print(data)
                    if not initial_data == data:
                        yield "\ndata: {}\n\n".format(data)
                        initial_data = data
                    time.sleep(2)
                else:
                    time.sleep(2)
                    continue
            else:
                json_string = json.dumps({'data': 0})
                data = json_string
                if not initial_data == data:
                    yield "\ndata: {}\n\n".format(data)
                    initial_data = data
                time.sleep(2)

    except Exception as e:
        print('exception of while', e)


def get_latest_order(requests):
    try:
        response = StreamingHttpResponse(event_stream(), status=200)
        response['Content-Type'] = 'text/event-stream'
        response['Cache-Control'] = 'no-cache'
        print(response)
        return response
    except Exception as e:
        response = HttpResponseBadRequest('Invalid request: %s.\n' % str(e))
        print('exception of get_latest_order', e)
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

        if order.status != 'prepared' or request.data['status'] != 'paid':
            serializer = OrderUpdateSerializer(order, data=request.data)
            if serializer.is_valid():
                serializer.save()
                order_status = serializer.data
        else:
            order_status = {'status': 'prepared'}

        if request.data['status'] == 'paid':
            order.paid_status = True
            order.save()
        elif request.data['status'] == 'paylater':
            order.paid_status = False
            order.save()
        elif request.data['status'] == 'cancelled':
            order.paid_status = False
            order.save()
        elif request.data['status'] == 'dispatched':
            # order.paid_status = True
            order.complete_status = True
            order.dispatched_status = True
            order.save()
        return Response(data={'message': 'Status Updated!', 'order': order_status}, status=HTTP_200_OK)


def handler_404(request, exception):
    return render(request, 'index.html')
