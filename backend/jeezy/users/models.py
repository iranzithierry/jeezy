from typing import ClassVar
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from .managers import UserManager
from django.utils import timezone

class User(AbstractUser):
    name = models.CharField(_("name"), blank=True, max_length=255, null=True)
    email = models.EmailField(_("email address"), unique=True)
    picture = models.ImageField(_("image"), blank=True, upload_to="user/images", null=True)
    email_verified_at = models.DateTimeField(_("email verified at"), null=True, blank=True)
    sign_up_method = models.CharField(_("login method used"), blank=True, max_length=255, null=True, default="email")
    username = models.CharField(blank=True, max_length=255, null=True, unique=True)
    github_installaton_id = models.CharField(_("github installaton_id"), blank=True, max_length=255, null=True, unique=True)
    github_public_access_token = models.CharField(_("github access token"), blank=True, max_length=255, null=True, unique=True)
    github_private_access_token = models.CharField(_("github private access token"), blank=True, max_length=255, null=True, unique=True)
    installed_github = models.BooleanField(_("is user installed github on his/her account"), default=False, null=True)
    github_id = models.CharField(_("github id"), blank=True, max_length=255, null=True, unique=True)
    USERNAME_FIELD = "email"

    REQUIRED_FIELDS = []
    first_name = None   # type: ignore[assignment]
    last_name = None    # type: ignore[assignment]

    objects: ClassVar[UserManager] = UserManager()

    def set_email_verified(self):
        self.email_verified_at = timezone.now()

    def email_verified(self):
        return self.email_verified_at is not None

    def image(self):
        if len(str(self.picture)) == 0:
            return None
        if (str(self.picture)  and str(self.picture).startswith("https://") or str(self.picture).startswith("http://") ):
            return str(self.picture)
        else:
            return self.picture.url

    class Meta:
        db_table = "users"


class EmailVerification(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="email_verification"
    )
    otp = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    verified_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.user.email + " - " + self.token

    class Meta:
        db_table = "email_verifications"
    
    def verified(self):
        return self.user.email_verified()
    
    def set_verified(self):
        self.verified_at = timezone.now()
