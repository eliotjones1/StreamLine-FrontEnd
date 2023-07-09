from django.contrib import admin
from .models import UserSettings, UserSubscription, TOSChecked, Subscription
admin.site.register(UserSettings)
admin.site.register(UserSubscription)
admin.site.register(TOSChecked)
admin.site.register(Subscription)
# Register your models here.
