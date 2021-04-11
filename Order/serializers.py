from rest_framework import serializers
from .models import *


class ProductSerializer(serializers.ModelSerializer):
    # category = CategorySerializer()
    # print(category)
    # categories = serializers.ReadOnlyField(source="category.type", read_only=True, )
    # category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), write_only=True, source='type')
    # print(category)

    # category = serializers.ReadOnlyField(source="category.type", read_only=True, )

    # queryset = Category.objects.all()
    # if queryset is not None:
    #     queryset = queryset.filter(category='Sandwiches')

    class Meta:
        model = Product
        # ordering = ["category"]
        fields = ("id", "name", "image", "description", )
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
    # addon_product_items = AddonSerializer(many=True, read_only=True)
    # product_table = ProductSizeSerializer(many=True, read_only=True)
    # addon_size = serializers.ReadOnlyField(source="size.size_name", read_only=True, )
    # addon_size = serializers.ReadOnlyField(source="productsize.size_table", read_only=True, )

    class Meta:
        model = Product
        # fields = ("addon_size", "id", "sizes", "addon_product_items")
        # fields = ("id", "sizes", "addon_product_items", "product_table")
        fields = ("id", "name", "size",)
        # fields = '__all__'


class AddonSerializer(serializers.ModelSerializer):
    # size_table = serializers.ReadOnlyField(source="addon_product_size.size_table", read_only=True, )
    # addon_size = serializers.ReadOnlyField(source="size.size_name", read_only=True, )

    class Meta:
        model = Addon
        # fields = ("addon_size", "id", "addon_name", "price", )
        fields = ("id", "name", "price", )
        # fields = '__all__'


class GetAddonsSerializer(serializers.ModelSerializer):
    addons = AddonSerializer(many=True, read_only=True)

    class Meta:
        model = Size
        fields = ("id", "name", "addons", )
        # fields = "__all__"


# class AddCategorySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Category
#         fields = '__all__'

# class POSTSizeSerializer(serializers.ModelSerializer):
#     # items = serializers.ReadOnlyField(source="size.name", read_only=True, )
#     # items = AddonSerializer(many=True, read_only=True)
#
#     class Meta:
#         model = Size
#         fields = ("id", "name", "price",)
#         # fields = '__all__'
#
#
# class POSTCategorySerializer(serializers.ModelSerializer):
#     products = ProductSerializer(many=True, read_only=True)
#     products = ProductSerializer(many=True, read_only=True)
#
#     class Meta:
#         model = Category
#         fields = ("type", "products")
# def create(self, validated_data):
#     tracks_data = validated_data.pop('tracks')
#     album = Album.objects.create(**validated_data)
#     for track_data in tracks_data:
#         Track.objects.create(album=album, **track_data)
#     return album

