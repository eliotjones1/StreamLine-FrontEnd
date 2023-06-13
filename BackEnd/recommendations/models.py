from django.db import models
from user_auth.models import CustomUser

# Create your models here.
class MediaRatings(models.Model):
    media_id = models.IntegerField()
    user_id = models.JSONField(CustomUser)
    rating = models.FloatField()
    type = models.CharField(max_length=10)

    