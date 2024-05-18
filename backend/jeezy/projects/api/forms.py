import json
from django import forms
from ..models import Project, Deployment


class ProjectBasicSettingsForm(forms.Form):
    project_name = forms.CharField()
    git_repository = forms.CharField()
    root_directory = forms.CharField()

class ProjectEnvironSettingsForm(forms.Form):
    project = forms.CharField(required=True, error_messages={"required": "Can not create envs of non created project"})
    env_file = forms.CharField(required=False)
    envs = forms.JSONField()
    def clean_envs(self):
        envs_data = self.cleaned_data['envs']
        json_str = json.dumps(envs_data, indent=4)
        json_data = json.loads(json_str)
        if not "key" or  "value" in json_data:
            raise forms.ValidationError("No key or value in envs")
            #validate json_data
        # except:
        #     raise forms.ValidationError("Invalid data in envs data")
        return envs_data


class ProjectBuildSettingsForm(forms.Form):
    build_cmd = forms.CharField()
    output_dir =  forms.CharField()
    install_cmd = forms.CharField()

class DeploymentForm(forms.Form):
    class Meta:
        model = Deployment
        fields = "__all__"
