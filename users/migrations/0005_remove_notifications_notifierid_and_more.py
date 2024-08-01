# Generated by Django 4.2.13 on 2024-07-30 14:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_remove_notifications_teacherid'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='notifications',
            name='NotifierID',
        ),
        migrations.AddField(
            model_name='notifications',
            name='Notifier',
            field=models.CharField(default='admin', max_length=255),
        ),
    ]
