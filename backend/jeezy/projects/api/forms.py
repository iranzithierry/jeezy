from django import forms
from ..models import Project, Deployment


class ProjectBasicSettingsForm(forms.Form):
    project_name = forms.CharField()
    git_repository = forms.CharField()
    root_directory = forms.CharField()

class ProjectEnvironSettingsForm(forms.Form):
    project = forms.CharField(required=True, error_messages={"required": "Can not create envs of non created project"})
    key = forms.CharField()
    value =  forms.CharField()
    env_file = forms.CharField(required=False)

class ProjectBuildSettingsForm(forms.Form):
    build_cmd = forms.CharField()
    output_dir =  forms.CharField()
    install_cmd = forms.CharField()

class DeploymentForm(forms.Form):
    class Meta:
        model = Deployment
        fields = "__all__"
