from rest_framework import serializers
from jeezy.users.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import exceptions

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True)
    # picture = serializers.ImageField(use_url=True, allow_empty_file=True)
    username = serializers.CharField()
    email_verified = serializers.ReadOnlyField()

    def validate_email(self, value: str):
        if User.objects.filter(email=value.lower()).exists():
            raise serializers.ValidationError("This email has been already registered")
        return value.lower()

    class Meta:
        model = User
        fields = ("id", "username","name", "email", "image", "password", "email_verified", "connected_github")