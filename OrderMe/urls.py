"""OrderMe URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from django.views.static import serve

from Order.views import *

handler404 = 'Order.views.handler_404'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', check_time),
    path('', TemplateView.as_view(template_name='index.html'), name='index'),
    path('manage', TemplateView.as_view(template_name='index.html')),
    path('order', TemplateView.as_view(template_name='index.html')),
    path('cart', TemplateView.as_view(template_name='index.html')),
    path('api/', include('Order.urls')),
    re_path(r'^media/(?P<path>.*)$', serve,{'document_root': settings.MEDIA_ROOT}),
    # re_path(r'.*', TemplateView.as_view(template_name='index.html')),
]

admin.site.site_title = "BreadBites Admin"
admin.site.site_header = "BreadBites Admin"

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
