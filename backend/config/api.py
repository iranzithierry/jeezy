
from django.urls import re_path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from jeezy.users.api.views import  SelfGetAPIView, GithubInstallationView, CompleteSignUpView, EmailVerificationView, EmailSignUpView
from jeezy.users.api import views

urlpatterns = [
    re_path(r"^auth/token/refresh/?", TokenRefreshView.as_view()),
    
    re_path(r"^auth/sign-up/?", EmailSignUpView.as_view(), name='sign_up_view'),
    re_path(r"^auth/verify-email/?", EmailVerificationView.as_view(), name='email_verification'),
    re_path(r"^auth/complete-sign-up/?", CompleteSignUpView.as_view(), name='complete_sign_up'),
    re_path(r"^auth/github/installation/?", GithubInstallationView.as_view(), name="github_installation"),
    re_path(r"^auth/sign-in/?", TokenObtainPairView.as_view(), name='sign_in_view'),
    re_path(r"^auth/user/?", SelfGetAPIView.as_view(), name='self_get_view'),
]