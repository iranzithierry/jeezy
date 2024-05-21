#!/bin/sh

set -e

celery -A config.celery worker --loglevel=debug --concurrency=4
