# Generated by Django 4.2 on 2023-07-07 17:02

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("prod_management", "0003_usersubscription_stripe_customer_id_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="usersubscription",
            name="is_setup",
            field=models.BooleanField(default="False"),
        ),
        migrations.CreateModel(
            name="Subscription",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("subscription_name", models.CharField(max_length=100)),
                ("end_date", models.DateField(blank=True, null=True)),
                ("recurring", models.BooleanField(default="False")),
                ("num_months", models.IntegerField(default=0)),
                ("num_cancellations", models.IntegerField(default=0)),
                ("is_active", models.BooleanField(default="True")),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="subscription",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
