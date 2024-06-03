# Use an official Python runtime as a parent image
FROM python:3.11.6

# Set the working directory in the container
WORKDIR /app


# ENV PYTHONUNBUFFERED 1

# Copy the requirements files before copying the rest of the application
COPY ./requirements/ ./requirements

# Install dependencies
RUN pip install -r ./requirements/production.txt && \
    pip install -r ./requirements/extra.txt

# Copy the rest of the application code to the working directory
COPY . /app/

# Inform Docker that the container listens on the specified port
EXPOSE 8000
