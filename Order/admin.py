from django.contrib import admin
from .models import *

# Register your models here.

# admin.site.register(QrCode)
admin.site.register(Time)
admin.site.register(Pin)
# admin.site.register(Person)
# admin.site.register(Order)
# admin.site.register(OrderItem)
# admin.site.register(AddonOrderItem)
# admin.site.register(Category)
# admin.site.register(Product)
# admin.site.register(Size)
# admin.site.register(ProductSize)
# admin.site.register(Addon)


class CategoryAdmin(admin.ModelAdmin):
    model = Product
    list_display = ('id', 'type')


admin.site.register(Category, CategoryAdmin)


class ProductAdmin(admin.ModelAdmin):
    model = Product
    list_display = ('id', 'category', 'name', 'stock_out', 'price')


admin.site.register(Product, ProductAdmin)


class SizeAdmin(admin.ModelAdmin):
    model = Size
    list_display = ('id', 'product', 'name', 'price', )


admin.site.register(Size, SizeAdmin)


class AddonAdmin(admin.ModelAdmin):
    model = Addon
    list_display = ('id', 'addon_product', 'name', 'price')


admin.site.register(Addon, AddonAdmin)


class PersonAdmin(admin.ModelAdmin):
    model = Person
    list_display = ('id', 'name', 'phone')


admin.site.register(Person, PersonAdmin)


class OrderAdmin(admin.ModelAdmin):
    model = Order
    list_display = ('id', 'person', 'status', 'complete_status', 'paid_status', 'paid', 'total', 'created_at')


admin.site.register(Order, OrderAdmin)


class OrderItemAdmin(admin.ModelAdmin):
    model = OrderItem
    list_display = ('id', 'product', 'order', 'size', 'total')


admin.site.register(OrderItem, OrderItemAdmin)


class AddonOrderItemAdmin(admin.ModelAdmin):
    model = AddonOrderItem
    list_display = ('id', 'orderitem', 'addon')


admin.site.register(AddonOrderItem, AddonOrderItemAdmin)
