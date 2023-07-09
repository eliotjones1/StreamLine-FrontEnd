from django.contrib import admin
from .models import UserSettings, UserSubscription, TOSChecked
admin.site.register(UserSettings)
admin.site.register(UserSubscription)
admin.site.register(TOSChecked)
# Register your models here.
