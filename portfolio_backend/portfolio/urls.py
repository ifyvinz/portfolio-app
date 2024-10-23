from rest_framework.authtoken.views import obtain_auth_token
#need to be able to upload images
from django.conf.urls.static import static
from django.conf import settings

from django.contrib import admin
from django.urls import path, include
from portfolio import views
from markdownx import urls as markdownx_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('profile/', views.profile_detail, name='profile-detail'),
    path('blogposts/', views.blogpost_list, name='blogpost-list'),
    path('blogposts/<int:pk>/', views.blogpost_detail, name='blogpost-detail'),
    path('contact/', views.contact_create, name='contact-create'),
    path('portfolio/', views.portfolio_list, name='portfolio-list'),
    path('portfolio/<int:pk>/', views.portfolio_detail, name='portfolio-detail'),
    path('services/', views.service_list, name='service-list'),
    path('services/<int:pk>/', views.service_detail, name='service-detail'),
    path('send-email/', views.send_contact_email, name='send-email'),
    path('markdownx/', include(markdownx_urls)),
]

if settings.DEBUG:
    urlpatterns = urlpatterns + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns = urlpatterns + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)