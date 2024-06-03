import pytest
from celery.result import EagerResult

from jeezy.users.tasks import send_otp_code

pytestmark = pytest.mark.django_db


def test_email(settings):
    """A basic test to send opt code to user a Celery task."""
    settings.CELERY_TASK_ALWAYS_EAGER = True
    task_result = send_otp_code("test@test.com", "5435").delay()
    assert isinstance(task_result, EagerResult)
