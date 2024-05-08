from rest_framework import status, permissions, generics
from rest_framework.response import Response
from rest_framework.request import Request
from jeezy.users.tasks import send_verification_email
from jeezy.users.models import User, EmailVerification
from jeezy.users.forms import EmailSignUpForm, CompleteSignUpForm, EmailLoginForm
from .serializers import UserSerializer
from rest_framework.views import APIView
from .utils import generate_token, get_tokens_for_user

class EmailSignUpView(APIView):
    def post(self, request: Request, *args, **kwargs) -> Response:
        form = EmailSignUpForm(data=request.data)
        if form.is_valid():
            email = form.cleaned_data["email"]
            user = User.objects.create_user(email=email, password=None, is_active=False)
            token = generate_token()
            EmailVerification.objects.create(user=user, token=token)
            send_verification_email.delay(user.email, token)
            return Response({"message": "Email verification link sent", "success": True},status=status.HTTP_200_OK,)
        return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)

class SignInView(APIView):
    def post(self, request: Request, *args, **kwargs) -> Response:
        form = EmailLoginForm(data=request.data)
        if form.is_valid():
            email = form.cleaned_data.get("email")
            password = form.cleaned_data.get("password", "")
            
            user = User.objects.filter(email=email).first()
            if user is None:
                return self.respond("Invalid credentials")
            if not user.email_verified():
                return self.respond("Verify you email first to login")
            
            if not user.is_active:
                return self.respond("Complete your registration to login")
            
            authorized = user.check_password(password)

            if not authorized:
                return self.respond("Invalid credentials")

            return Response(
                {"message": "Login successful", "success": True, "user": UserSerializer(user).data, "tokens": get_tokens_for_user(user)},
                status=status.HTTP_200_OK,
            )

        return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)

    def respond(self, message = None, success =  False, status = status.HTTP_400_BAD_REQUEST) -> Response:
        return Response({"message": message, "success": success}, status=status)

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
                if user.is_active:
                    return Response({"message": "User already completed signup", "success": False}, status=status.HTTP_400_BAD_REQUEST)
                if user.email_verified():
                    user.set_password(form.cleaned_data["password"])
                    user.name = form.cleaned_data.get("name", None)
                    user.is_active = True
                    user.save()
                    return Response({"message": "Sign up successful", "success": True, "user": UserSerializer(user).data, "tokens": get_tokens_for_user(user),  },  status=status.HTTP_201_CREATED )
                else:
                    return Response({"message": "Verify your email first to continue", "success": False}, status=status.HTTP_400_BAD_REQUEST)
            except User.DoesNotExist:
                return Response({"message": "No user with this email found", "success": False}, status=status.HTTP_400_BAD_REQUEST )
        return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)

class MeAPIView(generics.GenericAPIView):
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

