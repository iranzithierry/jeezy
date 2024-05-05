
from django.urls import re_path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from jeezy.users.api.views import  SelfGetAPIView
from jeezy.users.api import views

urlpatterns = [
    re_path(r"^auth/token/refresh/?", TokenRefreshView.as_view()),

    re_path(r"^auth/sign-up/?", views.email_sign_up, name='sign_up_view'),
    re_path(r"^auth/verify-email/?", views.email_verification, name='email_verification'),
    re_path(r"^auth/complete-sign-up/?", views.complete_sign_up, name='complete_sign_up'),

    re_path(r"^auth/sign-in/?", TokenObtainPairView.as_view(), name='sign_in_view'),
    re_path(r"^auth/user/?", SelfGetAPIView.as_view(), name='self_get_view'),
]