from rest_framework import serializers
from jeezy.users.models import User
from django.core.files.uploadedfile import InMemoryUploadedFile


class UserSerializer(serializers.ModelSerializer):
    names = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True)
    # avatar = serializers.ImageField(use_url=True, allow_empty_file=True)

    def validate_email(self, value: str):
        if User.objects.filter(email=value.lower()).exists():
            raise serializers.ValidationError("This email already registered")
        return value.lower()

    class Meta:
        model = User
        fields = ("names", "email", "avatar", "password")
