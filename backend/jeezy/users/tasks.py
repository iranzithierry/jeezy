from celery import shared_task
from .models import User
from celery import shared_task
from django.core.mail import send_mail

from jeezy.users.mails import email_verification

@shared_task
def send_verification_email(email: str, token: str):
    # Construct the verification link
    verification_link = f'http://127.0.0.1:8000/api/auth/verify-email?token={token}&email={email}/'
    send_mail(
        subject="Email verification",
        message="Verify your email to sign up for Jeezy",
        from_email="no-reply@jeezy.com",
        recipient_list=[email],
        fail_silently=False,
        html_message=email_verification.main(verification_link=verification_link),
    )
