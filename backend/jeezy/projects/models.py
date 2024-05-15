from django.db import models
from django.utils.translation import gettext_lazy as _
from jeezy.users.models import User

class Project(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="user_projects"
    )
    name = models.CharField(_("Project Name"), max_length=255)
    VISIBILITY_CHOICES = [
        ("PU", "Public"),
        ("PR", "Private"),
    ]
    visibility = models.TextField(_("Visibility"), choices=VISIBILITY_CHOICES, default="PU")
    repository_source = models.CharField(_("Repository Source"), max_length=255, null=True, blank=True)
    generated_domain = models.CharField(_("Generated Domain"), max_length=255, null=True, blank=True)
    technology_used = models.CharField(_("Technology Used"), max_length=255, null=True, blank=True)
    last_deployed = models.DateTimeField(_("Last Deployed"), null=True, blank=True)
    active_deployment = models.OneToOneField(
        'Deployment', 
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='active_deployment_for_project'
    )
    collaborators = models.ManyToManyField(
        User,
        related_name="collaborating_projects",
        blank=True
    )
    cloned_repo_path = models.CharField(_("Cloned Repository Path"), max_length=255, null=True, blank=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        db_table = "projects"

class Deployment(models.Model):
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="deployments"
    )
    commit = models.CharField(_("Commit"), max_length=255)
    branch = models.CharField(_("Branch"), max_length=255)
    status = models.CharField(_("Status"), max_length=255)
    deployed_at = models.DateTimeField(_("Deployed At"), auto_now_add=True)
    deployed_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="deployed_projects"
    )
    deployment_logs = models.TextField(_("Deployment Logs"), null=True, blank=True)
    build_command = models.CharField(_("Build Command"), max_length=255, null=True, blank=True) # Added build_command field
    build_output = models.TextField(_("Build Output"), null=True, blank=True) # Added build_output field
    
    def __str__(self):
        return f"Deployment for {self.project.name}"
    
    class Meta:
        db_table = "deployments"
