from django.conf import settings
from django.contrib import admin
from django.contrib.auth import admin as auth_admin
from django.contrib.auth.decorators import login_required
from django.utils.translation import gettext_lazy as _
from .models import User


@admin.register(User)
class UserAdmin(auth_admin.UserAdmin):
    fieldsets = (
        (None, {"fields": ("email", "password", "location", "verified_at", "banned_at")}),
        (_("Personal info"), {"fields": ("names",)}),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_staff",
                    "is_active",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
    )
    list_display = ["email", "names", "is_superuser"]
    search_fields = ["names", "email"]
    ordering = ["id"]
    list_filter = (
        "is_staff",
        "is_superuser",
        "is_active",
        "groups",
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("names", "email", "password1", "password2"),
            },
        ),
    )
