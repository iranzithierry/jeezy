from rest_framework import status, permissions, generics
from rest_framework.response import Response
from rest_framework.request import Request
from jeezy.users.tasks import send_verification_email
from jeezy.users.models import User, EmailVerification
from jeezy.users.forms import EmailSignUpForm, CompleteSignUpForm, EmailLoginForm
from .serializers import UserSerializer
from rest_framework.views import APIView
from jeezy.secrets.jwt import get_app_jwt
import requests
import json
class SelfGetAPIView(generics.GenericAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request: Request) -> Response:
        return Response(
            {"user": UserSerializer(request.user).data}, 
            status=status.HTTP_200_OK
        )

    def patch(self, request: Request) -> Response:
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EmailSignUpView(APIView):
    def post(self, request: Request, *args, **kwargs) -> Response:
        form = EmailSignUpForm(data=request.data)
        if form.is_valid():
            email = form.cleaned_data["email"]
            user = User.objects.create_user(email=email)
            token = generate_token()
            EmailVerification.objects.create(user=user, token=token)
            send_verification_email.delay(user.email, token)
            return Response({"message": "Email verification link sent", "success": True},status=status.HTTP_200_OK,)
        return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)

class SignInView(APIView):
    def post(self, request: Request, *args, **kwargs) -> Response:
        method = request.GET.get('method', 'email')
        form = EmailLoginForm(data=request.data)
        match method:
            case "github":
                form.cleaned_data["password"] = "access_token"
                pass
        if form.is_valid():
            email = form.cleaned_data["email"]
            user = User.objects.create_user(email=email)
            token = generate_token()
            EmailVerification.objects.create(user=user, token=token)
            send_verification_email.delay(user.email, token)
            return Response({"message": "Email verification link sent", "success": True},status=status.HTTP_200_OK,)
        return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)

class EmailVerificationView(generics.CreateAPIView):
    def create(self, request: Request, *args, **kwargs) -> Response:
        token = request.data.get("token")
        if not token:
            return Response({"message": "No token provided", "success": False}, status=status.HTTP_400_BAD_REQUEST)
        try:
            verification = EmailVerification.objects.get(token=token)
            if  not verification.verified():
                verification.user.set_email_verified()
                verification.user.save()
                verification.set_verified()
                verification.save()
            else:
                return Response({"message": "This email is already verified", "success": False}, status=status.HTTP_400_BAD_REQUEST)
            return Response({"message": verification.user.email, "success": True}, status=status.HTTP_200_OK)
        except EmailVerification.DoesNotExist:
            return Response({"message": "Invalid token", "success": False}, status=status.HTTP_400_BAD_REQUEST)


class CompleteSignUpView(generics.CreateAPIView):
    def create(self, request: Request, *args, **kwargs) -> Response:
        form = CompleteSignUpForm(data=request.data)
        if form.is_valid():
            try:
                user = User.objects.get(email=form.cleaned_data["email"])
                if user.email_verified():
                    user.set_password(form.cleaned_data["password"])
                    user.name = form.cleaned_data.get("name", None)
                    user.save()
                    return Response({"message": "Sign up successful", "success": True },  status=status.HTTP_201_CREATED )
                else:
                    return Response({"message": "Verify your email first to continue", "success": False}, status=status.HTTP_400_BAD_REQUEST)
            except User.DoesNotExist:
                return Response({"message": "No user with this email found", "success": False}, status=status.HTTP_400_BAD_REQUEST )
        return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)


class GithubInstallationView(generics.CreateAPIView):
    def create(self, request: Request, *args, **kwargs) -> Response:
        installation_id = request.data.get("installation_id")
        if installation_id:
            application_jwt = get_app_jwt()
            headers = {
                "Authorization": f"Bearer {application_jwt}",
            }
            try:
                data = requests.post(f"https://api.github.com/app/installations/{installation_id}/access_tokens", headers=headers)
            except Exception as e:
                return Response({"message": e, "success": False },  status=status.HTTP_500_INTERNAL_SERVER_ERROR )
            response = data.json()
            # ATTACHING AUTH USER WITH INSTALLATION ID
            if "message" in  data.json():
                response = data.json()['message']
            if "token" in response:
                # return token with datetime.fromisoformat("2024-05-06T23:29:28Z".replace('Z', '+00:00'))

                response = response['token']
            return Response({"message": response, "success": True },  status=data.status_code )
        else:
            return Response({"message": "No installation id provided", "success": False}, status=status.HTTP_400_BAD_REQUEST)

def generate_token():
    import secrets
    import string

    return "".join(
        secrets.choice(string.ascii_letters + string.digits) for _ in range(52)
    )
