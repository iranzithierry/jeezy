# Generated by Django 4.2.11 on 2024-05-06 18:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0011_githubaccount_bio_githubaccount_location'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='github_account',
        ),
        migrations.AddField(
            model_name='emailverification',
            name='verified_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='github_installaton_id',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='github installaton_id'),
        ),
        migrations.AddField(
            model_name='user',
            name='github_username',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='github username'),
        ),
        migrations.DeleteModel(
            name='GithubAccount',
        ),
    ]
