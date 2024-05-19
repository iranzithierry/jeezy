FROM python:3.11.6

ARG REQUIREMENTS_FILE

EXPOSE 8000

CMD "gunicorn --bind 0.0.0.0:8000 -w 4 --limit-request-line 6094 --access-logfile - config.wsgi:application"

COPY ./requirements/ ./requirements
RUN pip install -r ./requirements/production.txt
RUN pip install -r ./requirements/extra.txt

COPY . ./
