from django.contrib import admin
from .models import UserSettings, UserSubscription, TOSChecked, Subscription, UserContactRequest
admin.site.register(UserSettings)
admin.site.register(UserSubscription)
admin.site.register(TOSChecked)
admin.site.register(Subscription)
admin.site.register(UserContactRequest)
# Register your models here.
