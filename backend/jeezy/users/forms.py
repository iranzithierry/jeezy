from django import forms
from .models import User
from django.core import validators
class EmailSignUpForm(forms.Form):
    email = forms.EmailField()

    def clean_email(self):
        email = self.cleaned_data.get('email', '')
        if User.objects.filter(email=email.lower()).exists():
            raise forms.ValidationError("User with this email already registered")
        return email.lower()

class CompleteSignUpForm(forms.Form):
    email = forms.EmailField()
    name = forms.CharField(max_length=100)
    password = forms.CharField(widget=forms.PasswordInput)
    github_username =forms.CharField(max_length=200, required=False)

class EmailLoginForm(forms.Form):
    email = forms.EmailField()
    password = forms.CharField(widget=forms.PasswordInput)