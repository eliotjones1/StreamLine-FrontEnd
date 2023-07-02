# Generated by Django 4.2 on 2023-07-02 14:31

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("user_auth", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="UserSettings",
            fields=[
                (
                    "user",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        primary_key=True,
                        related_name="usersettings",
                        serialize=False,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                ("First_Name", models.CharField(max_length=100)),
                ("Last_Name", models.CharField(max_length=100)),
                ("Street_Address", models.CharField(max_length=100)),
                ("City", models.CharField(max_length=100)),
                ("State_Province", models.CharField(max_length=100)),
                ("Country", models.CharField(default="United States", max_length=100)),
                ("Postal_Code", models.CharField(max_length=100)),
                ("Newsletter", models.BooleanField(default="True")),
                ("Promotions", models.BooleanField(default="True")),
                (
                    "Push_Notifications",
                    models.CharField(
                        choices=[
                            ("Everything", "Everything"),
                            ("SameAsEmail", "Same as Email"),
                            ("None", "None"),
                        ],
                        max_length=20,
                    ),
                ),
                (
                    "Email",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="settings_email",
                        to=settings.AUTH_USER_MODEL,
                        to_field="email",
                    ),
                ),
            ],
        ),
    ]
