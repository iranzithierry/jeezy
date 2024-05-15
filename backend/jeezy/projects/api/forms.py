from django import forms
from ..models import Project, Deployment

class ProjectForm(forms.ModelForm):
    class Meta:
        model = Project
        fields = '__all__'

class DeploymentForm(forms.ModelForm):
    class Meta:
        model = Deployment
        fields = '__all__'
