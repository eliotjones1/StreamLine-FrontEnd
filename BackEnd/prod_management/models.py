from django.db import models
from user_auth.models import CustomUser
# Create your models here.


class UserSettings(models.Model):
    EVERYTHING = 'Everything'
    SAME_AS_EMAIL = 'SameAsEmail'
    NONE = 'None'

    CHOICES = (
        (EVERYTHING, 'Everything'),
        (SAME_AS_EMAIL, 'Same as Email'),
        (NONE, 'None'),
    )

    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, primary_key=True, related_name='usersettings')
    Email = models.OneToOneField(CustomUser, to_field='email', on_delete=models.CASCADE, related_name='settings_email')
    First_Name = models.CharField(max_length=100)
    Last_Name = models.CharField(max_length=100)
    Street_Address = models.CharField(max_length=100)
    City = models.CharField(max_length=100)
    State_Province = models.CharField(max_length=100)
    Country = models.CharField(max_length=100, default = "United States")
    Postal_Code = models.CharField(max_length = 6)
    Newsletter = models.BooleanField(default = "True")
    Promotions = models.BooleanField(default = "True")
    Push_Notifications = models.CharField(max_length=20, choices=CHOICES)

class UserSubscription(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, primary_key=True, related_name='usersubscription')
    Premium = models.BooleanField(default = "False")
    Basic = models.BooleanField(default = "False")
    Premium_Expiration = models.DateField(null=True, blank=True)
    Basic_Expiration = models.DateField(null=True, blank=True)
    stripe_customer_id = models.CharField(max_length=100, null=True, blank=True)
    stripe_subscription_id = models.CharField(max_length=100, null=True, blank=True)


    