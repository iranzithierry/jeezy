from rest_framework import serializers
from jeezy.users.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import exceptions

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True)
    # picture = serializers.ImageField(use_url=True, allow_empty_file=True)
    email_verified = serializers.ReadOnlyField()

    def validate_email(self, value: str):
        if User.objects.filter(email=value.lower()).exists():
            raise serializers.ValidationError("This email already registered")
        return value.lower()

    class Meta:
        model = User
        fields = ("id", "name", "email", "image", "password", "email_verified")


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data["user"] = UserSerializer(self.user).data

        if not data['user']['email_verified']:
            raise exceptions.AuthenticationFailed(
                f"please verify you email first",
                "email_not_verified",
            )
        return data