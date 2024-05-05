from typing import ClassVar
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from .managers import UserManager
from django.utils import timezone


class GithubAccount(models.Model):
    github_id = models.IntegerField()
    company = models.CharField(blank=True, max_length=255, null=True)
    location = (models.CharField(blank=True, max_length=255, null=True),)
    bio = (models.TextField(blank=True, max_length=255, null=True),)
    public_repos = models.IntegerField(
        null=True,
        blank=True,
    )
    followers = models.IntegerField(
        null=True,
        blank=True,
    )
    following = models.IntegerField(
        null=True,
        blank=True,
    )
    total_private_repos = models.IntegerField(
        null=True,
        blank=True,
    )
    owned_private_repos = models.IntegerField(
        null=True,
        blank=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "github_accounts"


class User(AbstractUser):
    name = models.CharField(_("name"), blank=True, max_length=255, null=True)
    email = models.EmailField(_("email address"), unique=True)
    picture = models.ImageField(
        _("image"), blank=True, upload_to="user/images", null=True
    )
    email_verified_at = models.DateTimeField(
        _("email verified at"), null=True, blank=True
    )
    sign_up_method = models.CharField(
        _("login method used"), blank=True, max_length=255, null=True, default="email"
    )
    github_accout = models.ForeignKey(
        GithubAccount,
        on_delete=models.CASCADE,
        related_name="github_account",
        null=True,
        blank=True,
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    first_name = None  # type: ignore[assignment]
    last_name = None  # type: ignore[assignment]
    username = None  # type: ignore[assignment]

    objects: ClassVar[UserManager] = UserManager()

    def verify_email(self):
        self.email_verified_at = timezone.now

    def email_verified(self):
        return self.email_verified_at is not None

    def image(self):
        if (
            str(self.picture)
            and str(self.picture).startswith("https://")
            or str(self.picture).startswith("http://")
        ):
            return str(self.picture)
        else:
            return self.picture.url

    class Meta:
        db_table = "users"


class EmailVerification(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="email_verification"
    )
    token = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.email + " - " + self.token

    class Meta:
        db_table = "email_verifications"
