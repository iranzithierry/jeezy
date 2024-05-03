from typing import ClassVar
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from .managers import UserManager


class User(AbstractUser):
    names = models.CharField(_("Names of user"), blank=True, max_length=255)
    email = models.EmailField(_("email address"), unique=True)
    avatar = models.ImageField(_("Avatar"), blank=True, upload_to="avatars", null=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    first_name = None  # type: ignore[assignment]
    last_name = None  # type: ignore[assignment]
    username = None  # type: ignore[assignment]

    objects: ClassVar[UserManager] = UserManager()
