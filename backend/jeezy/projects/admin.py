from django.contrib import admin
from jeezy.projects.models import Project, Deployment
# Register your models here.
admin.site.register(Project)
admin.site.register(Deployment)
