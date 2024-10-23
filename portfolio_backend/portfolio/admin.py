from django.contrib import admin
from .models import Profile, BlogPost, Contact, Portfolio, Service

# Register your models here.
admin.site.register(Profile)
admin.site.register(BlogPost)
admin.site.register(Contact)
admin.site.register(Portfolio)
admin.site.register(Service)

