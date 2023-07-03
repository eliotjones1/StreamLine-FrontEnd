from django.contrib import admin
from .models import CustomUser, UserData
admin.site.register(CustomUser)
admin.site.register(UserData)
# Register your models here.
