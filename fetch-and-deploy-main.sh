#!/bin/sh
# fetch-and-deploy-dev.sh
docker compose -f docker-compose-main.yml down --rmi all && \
    docker compose -f docker-compose-main.yml pull && \
    GATEWAY_PORT=8000 docker compose -f docker-compose-main.yml up -d;
