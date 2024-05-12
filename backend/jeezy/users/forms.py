from django import forms
from .models import User
from django.core import validators
class EmailSignUpForm(forms.Form):
    email = forms.EmailField()

    def clean_email(self):
        # token=iw1L6EFGCCxAHFumY86zJx3SPZUkLdkfr5MVyEHpla4egcg0H0mW
        email: str = self.cleaned_data.get('email', '')
        try:
            user = User.objects.get(email=email)
            if not user.email_verified():
                raise forms.ValidationError("Registered but pending email verification")
            raise forms.ValidationError("User with this email already registered")
        except User.DoesNotExist:
            return email 

class CompleteSignUpForm(forms.Form):
    name = forms.CharField(max_length=100)
    password = forms.CharField(widget=forms.PasswordInput, min_length=6, error_messages={"min_length": "Password must be atleast 6 chars"})

class EmailLoginForm(forms.Form):
    email = forms.EmailField()
    password = forms.CharField(widget=forms.PasswordInput)

class GithubSignInForm(forms.Form):
    email = forms.EmailField()
    access_token = forms.CharField(max_length=200)

class GithubSignUpForm(forms.Form):
    id = forms.IntegerField()
    name = forms.CharField(max_length=200)
    email = forms.EmailField()
    access_token = forms.CharField(max_length=200)
    image = forms.URLField()