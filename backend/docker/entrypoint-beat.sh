#!/bin/sh

set -e

celery -A config.celery beat --loglevel=debug --scheduler django_celery_beat.schedulers:DatabaseScheduler
