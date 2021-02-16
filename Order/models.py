from django.db import models
import qrcode
from io import BytesIO
from django.core.files import File
# from PIL import Image, ImageDraw

# Create your models here.


class QrCode(models.Model):
    name = models.CharField(max_length=200)
    qr_code = models.ImageField(upload_to='qr_code', blank=True)

    def __str__(self):
        return str(self.name)

    def save(self, *args, **kwargs):
        qr = qrcode.QRCode(version=1, box_size=50, border=2)
        data = self.name
        qr.add_data(data)
        qr.make(fit=True)
        img = qr.make_image(fill='black', back_color='white')

        # qr_code_image = qrcode.make(self.name)
        # canvas = Image.new('RGB', (290, 290), 'red')
        # draw = ImageDraw.Draw(canvas)
        # canvas.paste(qr_code_image)
        # fname = f'qr_code-{self.name}.png'
        # buffer = BytesIO()
        # canvas.save(buffer, 'PNG')
        # self.qr_code.save(fname, File(buffer), save=False)
        # canvas.close()

        fname = f'{self.name}_qrcode.png'
        buffer = BytesIO()
        img.save(buffer, 'PNG')
        self.qr_code.save(fname, File(buffer), save=False)

        # img.close()
        super().save(*args, **kwargs)


class Product(models.Model):
    name = models.CharField(max_length=200, null=True)
    description = models.CharField(max_length=500, default='', null=True)
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


class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True, blank=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=True, blank=True)
    bread = models.CharField(max_length=255, blank=True, null=True)
    size = models.CharField(max_length=255, blank=True, null=True)
    quantity = models.IntegerField(default=0, null=True, blank=True)
    date_added = models.DateTimeField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True, editable=False, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, editable=True, null=True, blank=True)
