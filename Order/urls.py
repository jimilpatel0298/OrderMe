from django.urls import path, include
from .views import *
from .models import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("Category", Categoryclass)
router.register("Product", Productsclass)


urlpatterns = [
    path('', include(router.urls)),
    # path('add_category', add_category, name='add_category'),
    path('product_details', product_details, name='product_details'),       # Get the details of all product
    path('get_sizes/<int:id>', get_sizes, name='get_sizes'),                # get all the sizes of a product
    path('get_addons/<int:size_id>', get_addons, name='get_addons'),        # get all the addons of a particular size
    path('place_order', place_order, name='place_order'),                   # place a new order
    path('get_order_details/<int:order_id>', get_order_details, name='order_details'),

]
