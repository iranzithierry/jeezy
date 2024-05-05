from rest_framework import status, permissions, generics
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import api_view
from jeezy.users.tasks import send_verification_email
from jeezy.users.models import User, EmailVerification
from jeezy.users.forms import EmailSignUpForm, CompleteSignUpForm
from .serializers import UserSerializer

class SelfGetAPIView(generics.GenericAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request: Request) -> Response:
        return Response({"user": UserSerializer(request.user).data}, status=status.HTTP_200_OK)

    def patch(self, request: Request) -> Response:
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def email_sign_up(request):
    form = EmailSignUpForm(request.data)
    if form.is_valid():
        email = form.cleaned_data['email']
        user, created = User.objects.get_or_create(email=email)
        if created:
            token = generate_token()
            EmailVerification.objects.create(user=user, token=token)
            send_verification_email.delay(user.email, token)
            return Response({'detail': 'Email verification link sent'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'User already exists'}, status=status.HTTP_400_BAD_REQUEST)
    return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def email_verification(request):
    token = request.data.get('token')
    try:
        verification = EmailVerification.objects.get(token=token)
        return Response({'email': verification.user.email}, status=status.HTTP_200_OK)
    except EmailVerification.DoesNotExist:
        return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def complete_sign_up(request):
    form = CompleteSignUpForm(request.data)
    if form.is_valid():
        name = form.cleaned_data['name']
        email = form.cleaned_data['email']
        password = form.cleaned_data['password']
        user = User.objects.get(email=email)
        if user:
            user.set_password(password)
            user.name = name
            user.save()
            return Response({'detail': 'Sign up successful'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'User already exists'}, status=status.HTTP_400_BAD_REQUEST)
    return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)


def generate_token():
    import secrets
    import string
    
    return''.join(secrets.choice(string.ascii_letters + string.digits) for _ in range(32))
