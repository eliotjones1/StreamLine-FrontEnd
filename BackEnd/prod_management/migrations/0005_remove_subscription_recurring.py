# Generated by Django 4.2 on 2023-07-07 17:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("prod_management", "0004_usersubscription_is_setup_subscription"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="subscription",
            name="recurring",
        ),
    ]
