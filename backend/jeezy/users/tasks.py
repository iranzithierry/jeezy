from celery import shared_task
from .models import User
from celery import shared_task
from django.core.mail import send_mail

from jeezy.users.mails import email_verification

@shared_task
def send_otp_code(email: str, otp: str):
    send_mail(
        subject="Verify your email address",
        message="Please use this one-time password to confirm your email:",
        from_email="no-reply@jeezy.com",
        recipient_list=[email],
        fail_silently=False,
        html_message=email_verification.main(otp=otp),
    )
