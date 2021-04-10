from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(Person)
admin.site.register(QrCode)
# admin.site.register(Order)
# admin.site.register(OrderItem)
# admin.site.register(Category)
# admin.site.register(Product)
# admin.site.register(Size)
# admin.site.register(ProductSize)
# admin.site.register(Addon)


class CategoryAdmin(admin.ModelAdmin):
    model = Product
    list_display = ('id', 'type', 'created_at', 'updated_at',)


admin.site.register(Category, CategoryAdmin)


class ProductAdmin(admin.ModelAdmin):
    model = Product
    list_display = ('id', 'category', 'name',)


admin.site.register(Product, ProductAdmin)


class SizeAdmin(admin.ModelAdmin):
    model = Size
    list_display = ('id', 'product', 'name', 'price', )


admin.site.register(Size, SizeAdmin)


class ProductSizeAdmin(admin.ModelAdmin):
    model = ProductSize
    list_display = ('id', 'product', 'size', )


admin.site.register(ProductSize, ProductSizeAdmin)


class AddonAdmin(admin.ModelAdmin):
    model = Addon
    list_display = ('id', 'addon_product', 'name', 'price')


admin.site.register(Addon, AddonAdmin)
