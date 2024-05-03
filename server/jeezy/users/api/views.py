from rest_framework import status, permissions, views
from rest_framework.response import Response
from jeezy.users.models import User
from .serializers import UserSerializer, UserSerializer
from rest_framework import generics
from rest_framework.request import Request
from django.http import HttpResponse
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings

class SelfGetAPIView(generics.GenericAPIView):
    serializer_class = UserSerializer  # Define serializer_class attribute
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request: Request) -> HttpResponse:
        """
        Returns the full user details for the authenticated user.

        Uses the UserSerializer to serialize the user data and
        returns it in the response.
        """
        # Since serializer_class attribute is defined, you don't need to assign it here
        return Response(
            {
                "user": UserSerializer(
                    request.user, context=self.get_serializer_context()
                ).data,
            },
            status=status.HTTP_200_OK,
        )

    def patch(self, request: Request) -> HttpResponse:
        """
        Updates the authenticated user's profile.

        Accepts a partial UserSerializer with the updated data. Validates the data, saves the updated user profile if valid, and returns the serialized user data. If invalid, returns a 400 error with the validation errors.
        """
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SignUpView(generics.GenericAPIView):
    def post(self, request: Request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            try:
                user = User.objects.create_user(**serializer.validated_data)
            except Exception as e:
                raise HttpResponse("Something goes wrong registering")
            return Response(
                {
                    "user": UserSerializer(
                        user, context=self.get_serializer_context()
                    ).data,
                    **get_tokens_for_user(user),
                },
                status=status.HTTP_200_OK,
            )
        else:
            return HttpResponse("Something goes wrong try again later.")


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }
