
from django.urls import re_path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from jeezy.users.api.views import  MeAPIView, CompleteSignUpView, EmailVerificationView, EmailSignUpView, SignInView
from jeezy.users.api.oauth import GithubInstallationView, GithubAuthenticateView
urlpatterns = [
    re_path(r"^auth/token/refresh/?", TokenRefreshView.as_view()),
    
    # Email Auth
    re_path(r"^auth/sign-up/?", EmailSignUpView.as_view(), name='sign_up_view'),
    re_path(r"^auth/verify-email/?", EmailVerificationView.as_view(), name='email_verification'),
    re_path(r"^auth/complete-sign-up/?", CompleteSignUpView.as_view(), name='complete_sign_up'),
    re_path(r"^auth/sign-in/?", SignInView.as_view(), name='sign_in_view'),

    # Github Oauth
    re_path(r"^auth/github/installation/?", GithubInstallationView.as_view(), name="github_installation"),
    re_path(r"^auth/github/authenticate/?", GithubAuthenticateView.as_view(), name='sign_in_view'),

    re_path(r"^auth/user/?", MeAPIView.as_view(), name='self_get_view'),
]