from rest_framework import serializers
from .models import *


# serialize to Get all the details of a product
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ("id", "description", "name", "price", "image")
