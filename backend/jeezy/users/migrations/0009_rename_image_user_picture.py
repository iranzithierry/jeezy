# Generated by Django 4.2.11 on 2024-05-05 13:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0008_remove_user_picture_user_image'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='image',
            new_name='picture',
        ),
    ]
