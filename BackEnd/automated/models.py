from django.db import models
from user_auth.models import CustomUser
# Create your models here.

class UserPaymentMade(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    amount = models.FloatField()
    date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=100, default="Pending")
    company = models.CharField(max_length=100, default="")