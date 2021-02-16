from django.urls import path, include
from .views import *


urlpatterns = [
    path('get_product', get_product, name='get_product'),

]
