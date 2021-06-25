from django.db import models
# import qrcode
# from io import BytesIO
# from django.core.files import File
# from PIL import Image, ImageDraw

# Create your models here.


# class QrCode(models.Model):
#     name = models.CharField(max_length=200)
#     qr_code = models.ImageField(upload_to='qr_code', blank=True)
#
#     def __str__(self):
#         return str(self.name)
#
#     def save(self, *args, **kwargs):
#         qr = qrcode.QRCode(version=1, box_size=50, border=2)
#         data = self.name
#         qr.add_data(data)
#         qr.make(fit=True)
#         img = qr.make_image(fill='black', back_color='white')
#
#         # qr_code_image = qrcode.make(self.name)
#         # canvas = Image.new('RGB', (290, 290), 'red')
#         # draw = ImageDraw.Draw(canvas)
#         # canvas.paste(qr_code_image)
#         # fname = f'qr_code-{self.name}.png'
#         # buffer = BytesIO()
#         # canvas.save(buffer, 'PNG')
#         # self.qr_code.save(fname, File(buffer), save=False)
#         # canvas.close()
#
#         fname = f'{self.name}_qrcode.png'
#         buffer = BytesIO()
#         img.save(buffer, 'PNG')
#         self.qr_code.save(fname, File(buffer), save=False)
#
#         # img.close()
#         super().save(*args, **kwargs)


class Category(models.Model):
    type = models.CharField(max_length=200, null=True, unique=True)
    created_at = models.DateTimeField(auto_now_add=True, editable=False, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, editable=True, null=True, blank=True)

    def __str__(self):
        return self.type.title()

    # def current_product(self):
    #     return Product.objects.filter(stock_out=False)


class Product(models.Model):
    category = models.ForeignKey(Category, related_name='products', on_delete=models.DO_NOTHING)
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=500, default='', null=True, blank=True)
    price = models.DecimalField(max_digits=5, decimal_places=0)
    calories = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    image = models.FileField(upload_to='image/', blank=True, null=True)
    customizable = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
    stock_out = models.BooleanField(default=False)

    # class Meta:
    #     ordering = ['price']

    # @property
    # def current_product(self):
    #     product = Product.objects.exclude(stock_out=True)
    #     return product

    def __str__(self):
        return self.name.title() + ' > ' + 'category: ' + self.category.type


class Size(models.Model):
    product = models.ForeignKey(Product, related_name='size', on_delete=models.DO_NOTHING)
    name = models.CharField(max_length=200)
    price = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True, editable=False, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, editable=True, null=True, blank=True)

    def __str__(self):
        return self.product.name.title() + ' > size: ' + self.name.lower()


class Addon(models.Model):
    addon_product = models.ForeignKey(Product, related_name='addon_product_items', on_delete=models.DO_NOTHING)
    addon_size = models.ForeignKey(Size, related_name='addons', on_delete=models.DO_NOTHING)
    name = models.CharField(max_length=255)
    price = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True, editable=False, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, editable=True, null=True, blank=True)

    def __str__(self):
        return self.addon_product.name.title() + ' > ' + self.name.title()

#
# class PersonManager(models.Manager):
#     def get_by_natural_key(self, id, name, phone):
#         return self.get(id=id, name=name, phone=phone)


class Person(models.Model):
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True, editable=False, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, editable=True, null=True, blank=True)

    def __str__(self):
        return self.name.title()
    # # objects = PersonManager()
    #
    # class Meta:
    #     unique_together = [['id', 'name', 'phone']]
    #
    # def natural_key(self):
    #     return self.id, self.name, self.phone


class Order(models.Model):

    Paid = 'paid'
    Cancelled = 'cancelled'
    Dispatched = 'dispatched'
    Tobepaid = 'tobepaid'
    Paylater = 'paylater'
    Prepared = 'prepared'

    person = models.ForeignKey(Person, related_name='order', on_delete=models.DO_NOTHING)
    date_order = models.DateTimeField(auto_now_add=True)
    complete_status = models.BooleanField(default=False)
    paid_status = models.BooleanField(default=False)
    dispatched_status = models.BooleanField(default=False)
    STATUS_CHOICES = (
        (Paid, 'Paid'),               # ( value, human readable-name)
        (Cancelled, 'Cancelled'),
        (Dispatched, 'Dispatched'),
        (Tobepaid, 'Tobepaid'),
        (Paylater, 'Paylater'),
        (Prepared, 'Prepared')
    )
    status = models.CharField(max_length=100, choices=STATUS_CHOICES, default=Tobepaid)
    paid = models.FloatField()
    total = models.FloatField()
    # transaction_id = models.CharField(max_length=200, null=True)
    # invoice = models.FileField(upload_to='invoices/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, editable=False, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, editable=True, null=True, blank=True)

    def __str__(self):
        return str(self.id)
    #
    # def natural_key(self):
    #     return self.id, self.person.natural_key(), self.status, self.paid, self.total


class OrderItem(models.Model):
    category = models.ForeignKey(Category, related_name='category', on_delete=models.DO_NOTHING)
    product = models.ForeignKey(Product, related_name='product_orderitem', on_delete=models.DO_NOTHING)
    order = models.ForeignKey(Order, related_name='orderitems', on_delete=models.DO_NOTHING)
    size = models.ForeignKey(Size,  related_name='item_size', on_delete=models.DO_NOTHING)
    total = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True, editable=False, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, editable=True, null=True, blank=True)

    def __str__(self):
        return str(self.order.id) + ' > ' + self.product.name.title()


class AddonOrderItem(models.Model):
    orderitem = models.ForeignKey(OrderItem, related_name='item_addons', on_delete=models.DO_NOTHING)
    addon = models.ForeignKey(Addon, related_name='addon_addon_order_item', on_delete=models.DO_NOTHING)
    created_at = models.DateTimeField(auto_now_add=True, editable=False, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, editable=True, null=True, blank=True)


class Time(models.Model):
    open_time = models.TimeField(auto_now_add=False, editable=True)
    close_time = models.TimeField(auto_now=False, editable=True)


class Pin(models.Model):
    passcode = models.CharField(max_length=10, default='2021', null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True, editable=False, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, editable=True, null=True, blank=True)

