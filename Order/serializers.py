from rest_framework import serializers
from .models import *

from django.core.serializers.json import Serializer
from django.db.models import Manager

# FYI: It can be any of the following as well:
# from django.core.serializers.pyyaml import Serializer
# from django.core.serializers.python import Serializer
# from django.contrib.gis.serializers.geojson import Serializer

JSON_ALLOWED_OBJECTS = (dict, list, tuple, str, int, bool)


class CustomSerializer(Serializer):

    def end_object(self, obj):
        for field in self.selected_fields:
            if field == 'pk':
                continue
            elif field in self._current.keys():
                continue
            else:
                try:
                    self._current[field] = getattr(obj, field)()  # for model methods
                    continue
                except TypeError:
                    pass
                try:
                    self._current[field] = getattr(obj, field)  # for property methods
                    continue
                except AttributeError:
                    pass
        super(CustomSerializer, self).end_object(obj)


class ProductSerializer(serializers.ModelSerializer):
    # queryset = Category.objects.all()
    # if queryset is not None:
    #     queryset = queryset.filter(category='Sandwiches')

    class Meta:
        model = Product
        # ordering = ["category"]
        fields = ("id", "name", "price", "image", "description",)
        # depth = 3


class CategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ("type", "products")


class SizeSerializer(serializers.ModelSerializer):
    # items = serializers.ReadOnlyField(source="size.name", read_only=True, )
    # items = AddonSerializer(many=True, read_only=True)

    class Meta:
        model = Size
        fields = ("id", "name", "price",)
        # fields = '__all__'


class GetSizeSerializer(serializers.ModelSerializer):
    size = SizeSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ("id", "name", "size",)
        # fields = '__all__'


class AddonSerializer(serializers.ModelSerializer):
    # size_table = serializers.ReadOnlyField(source="addon_product_size.size_table", read_only=True, )
    # addon_size = serializers.ReadOnlyField(source="size.size_name", read_only=True, )

    class Meta:
        model = Addon
        # fields = ("addon_size", "id", "addon_name", "price", )
        fields = ("id", "name", "price",)
        # fields = '__all__'


class GetAddonsSerializer(serializers.ModelSerializer):
    addons = AddonSerializer(many=True, read_only=True)

    class Meta:
        model = Size
        fields = ("id", "name", "addons",)
        # fields = "__all__"


class AddonOrderItemSerializer(serializers.ModelSerializer):
    name = serializers.ReadOnlyField(source="addon.name", read_only=True, )
    price = serializers.ReadOnlyField(source="addon.price", read_only=True, )

    class Meta:
        model = AddonOrderItem
        fields = ('id', 'addon', 'name', 'price',)
        # fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    item_addons = AddonOrderItemSerializer(many=True, read_only=True)
    category = serializers.ReadOnlyField(source="category.type", read_only=True, )
    name = serializers.ReadOnlyField(source="product.name", read_only=True,)
    size_id = serializers.ReadOnlyField(source="size.id", read_only=True,)
    size_name = serializers.ReadOnlyField(source="size.name", read_only=True,)
    price = serializers.ReadOnlyField(source="size.price", read_only=True,)

    class Meta:
        model = OrderItem
        fields = ('id', 'name', 'category', 'product', 'order', 'size_id', 'size_name', 'price', 'total', 'item_addons')
        # fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    orderitems = OrderItemSerializer(many=True, read_only=True)
    name = serializers.ReadOnlyField(source="product.name", read_only=True, )

    class Meta:
        model = Order
        fields = ('id', 'name', 'status', 'paid', 'total', 'orderitems')
        # fields = '__all__'


class PersonSerializer(serializers.ModelSerializer):
    order = OrderSerializer(many=True, read_only=True)

    class Meta:
        model = Person
        fields = ('id', 'name', 'phone', 'order')
        # fields = '__all__'


class OrderUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = ('status',)
        # fields = '__all__'