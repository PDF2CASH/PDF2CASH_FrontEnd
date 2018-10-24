#!/bin/bash

set -ev

echo "Deployment init"

echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker tag pdf2front pdf2cash/pdf2front:latest
docker push pdf2cash/pdf2front:latest








