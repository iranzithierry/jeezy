from rest_framework_simplejwt.tokens import RefreshToken
from jeezy.users.models import User


def get_tokens_for_user(user: User):
    refresh = RefreshToken.for_user(user)

    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }


def generate_token():
    import secrets
    import string

    return "".join(
        secrets.choice(string.ascii_letters + string.digits) for _ in range(52)
    )
