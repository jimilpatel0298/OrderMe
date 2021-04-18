from django.urls import path
from .views import *


urlpatterns = [
    # path('add_category', add_category, name='add_category'),
    path('menu', product_details, name='product_details'),                  # Get the details of all product
    path('get_sizes/<int:id>', get_sizes, name='get_sizes'),                # get all the sizes of a product
    path('get_addons/<int:size_id>', get_addons, name='get_addons'),        # get all the addons of a particular size
    path('place_order', csrf_exempt(place_order), name='place_order'),                   # place a new order
    path('get_order_details', get_order_details, name='order_details'),     # get all persons, orders, ordersitems
                                                                            # and addon orderitems
    path('get_latest_order', get_latest_order, name='get_latest_order'),    # get the details of latest order
    path('update_status/<int:order_id>', update_order_status),              # update status of a order

]
