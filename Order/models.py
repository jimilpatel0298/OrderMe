from django.db import models

# Create your models here.


class Product(models.Model):
    name = models.CharField(max_length=200, null=True)
    price = models.DecimalField(max_digits=5, decimal_places=2, null=True)
    calories = models.DecimalField(max_digits=7, decimal_places=2, null=True)
    image = models.FileField(upload_to='image/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, editable=False, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, editable=True, null=True, blank=True)

    def __str__(self):
        return self.name


class Person(models.Model):
    phone = models.CharField(max_length=10, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, editable=False, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, editable=True, null=True, blank=True)


class Order(models.Model):
    person = models.ForeignKey(Person, on_delete=models.CASCADE, null=True, blank=True)
    date_order = models.DateTimeField(auto_now_add=True)
    complete_status = models.BooleanField(default=False, null=True, blank=True)
    paid = models.FloatField(null=True, blank=True)
    total = models.FloatField(null=True, blank=True)
    transaction_id = models.CharField(max_length=200, null=True)
    # invoice = models.FileField(upload_to='invoices/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, editable=False, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, editable=True, null=True, blank=True)

    def __str__(self):
        return str(self.id)

    # @property
    # def get_cart_total(self):
    #     orderitems = self.orderitem_set.all()
    #     total = sum([item.get_total for item in orderitems])
    #     return total
    #
    # @property
    # def coupon_amount(self):
    #     if self.coupon is not None:
    #         discount_percent = self.coupon.discount_percent
    #     else:
    #         discount_percent = 0
    #
    #     total = self.get_cart_total
    #     coupon_amount_total = (discount_percent * total) / 100
    #     return coupon_amount_total
    #
    # @property
    # def get_cart_total_coupon(self):
    #     if self.coupon is None:
    #         total = self.get_cart_total
    #         return total
    #     else:
    #         discount_percent = self.coupon.discount_percent
    #         old_total = self.get_cart_total
    #         total = old_total - (discount_percent * old_total) / 100
    #         return total
    #
    # @property
    # def get_cart_items(self):
    #     orderitems = self.orderitem_set.all()
    #     total = sum(item.quantity for item in orderitems)
    #     return total


class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True, blank=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=True, blank=True)
    quantity = models.IntegerField(default=0, null=True, blank=True)
    date_added = models.DateTimeField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True, editable=False, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, editable=True, null=True, blank=True)

    # @property
    # def get_total(self):
    #     total = self.product.price_usa * self.quantity
    #     return total
