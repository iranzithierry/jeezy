from django.conf import settings
from rest_framework.routers import DefaultRouter
from django.urls import re_path
from rest_framework.routers import SimpleRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from jeezy.users.api.views import SignUpView, SelfGetAPIView

urlpatterns = [
    re_path(r"^auth/token/refresh/?", TokenRefreshView.as_view()),
    re_path(r"^auth/signup/?", SignUpView.as_view(), name='sign_up_view'),
    re_path(r"^auth/signin/?", TokenObtainPairView.as_view(), name='sign_in_view'),
    re_path(r"^auth/user/?", SelfGetAPIView.as_view(), name='self_get_view'),
]