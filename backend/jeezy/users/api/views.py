from rest_framework import status, permissions, generics
from rest_framework.response import Response
from rest_framework.request import Request
from jeezy.users.tasks import send_otp_code
from jeezy.users.models import User, EmailVerification
from jeezy.users.api.forms import EmailSignUpForm, CompleteSignUpForm, EmailLoginForm
from .serializers import UserSerializer
from rest_framework.views import APIView
from .utils import generate_otp, get_tokens_for_user

class EmailSignUpView(APIView):
    def post(self, request: Request, *args, **kwargs) -> Response:
        form = EmailSignUpForm(data=request.data)
        if form.is_valid():
            email = form.cleaned_data["email"]
            otp = generate_otp()
            try:
                send_otp_code.delay(email, otp)
            except Exception:
                return Response({"message": "We're sorry, there is an issue sending the one-time password to your email. Please try again later.", "success": False}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            user = User.objects.create_user(email=email, password=None, is_active=False)
            EmailVerification.objects.create(user=user, otp=otp)
            return Response({"message": f"An email with a one-time password has been sent to {email}.", "success": True},status=status.HTTP_200_OK,)
        return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)

class SignInView(APIView):
    def post(self, request: Request, *args, **kwargs) -> Response:
        form = EmailLoginForm(data=request.data)
        if form.is_valid():
            email = form.cleaned_data.get("email")
            password = form.cleaned_data.get("password", "")
            
            user = User.objects.filter(email=email).first()
            if user is None:
                return self.respond("Invalid credentials", status=401)
            if not user.email_verified():
                return self.respond("Verify you email first to login")
            
            if not user.is_active:
                return self.respond("Complete your registration to login")
            
            authorized = user.check_password(password)

            if not authorized:
                return self.respond("Invalid credentials", status=401)

            return Response(
                {"message": "Login successful", "success": True, "user": UserSerializer(user).data, "tokens": get_tokens_for_user(user)},
                status=status.HTTP_200_OK,
            )

        return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)

    def respond(self, message = None, success =  False, status = status.HTTP_400_BAD_REQUEST) -> Response:
        return Response({"message": message, "success": success}, status=status)

class EmailVerificationView(generics.CreateAPIView):
    def create(self, request: Request, *args, **kwargs) -> Response:
        form = CompleteSignUpForm(data=request.data)
        otp = request.data.get("otp")
        if not otp:
            return Response({"message": "Please provide an OTP code to verify your email.", "success": False}, status=status.HTTP_400_BAD_REQUEST)
        if form.is_valid():
            try:
                verification = EmailVerification.objects.get(otp=otp)
                user = verification.user
            except EmailVerification.DoesNotExist:
                return Response({"message": "The OTP code you provided seems to be invalid. Please check and try again.", "success": False}, status=status.HTTP_400_BAD_REQUEST)
            if  not verification.verified():
                # email verification doer
                user.set_password(form.cleaned_data.get("password"))
                user.name = form.cleaned_data.get("name", None)
                user.is_active = True
                user.set_email_verified()
                user.save()
                # email verification model
                verification.set_verified()
                verification.save()
                # 
                return Response({"message": "Sign up successful no you can login", "success": True, "user": UserSerializer(user).data, "tokens": get_tokens_for_user(user),  },  status=status.HTTP_201_CREATED )
            else:
                return Response({"message": "You have already verified your email", "success": False}, status=status.HTTP_400_BAD_REQUEST)
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

