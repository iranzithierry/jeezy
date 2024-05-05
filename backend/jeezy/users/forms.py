# forms.py

from django import forms
from .models import User

class EmailSignUpForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['email']

class CompleteSignUpForm(forms.Form):
    email = forms.EmailField()
    name = forms.CharField(max_length=100)
    password = forms.CharField(widget=forms.PasswordInput)

class EmailLoginForm(forms.Form):
    email = forms.EmailField()
    password = forms.CharField(widget=forms.PasswordInput)
