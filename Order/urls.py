from django.urls import path, include
from .views import *
from .models import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("Category", Categoryclass)
router.register("Product", Productsclass)


urlpatterns = [
    path('', include(router.urls)),
    # path('get_product', get_product, name='get_product'),
    path('get_category', get_category, name='get_category'),
    path('add_category', add_category, name='add_category'),
    path('get_customs/<int:id>', get_customs, name='get_customs'),
    path('get_addons/<int:size_id>', get_addons, name='get_addons'),
    # path('post_method', post_method, name='post_method'),

]
