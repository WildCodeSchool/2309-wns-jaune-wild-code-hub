#!/bin/sh
# fetch-and-deploy-dev.sh
docker compose -f docker-compose-dev.yml down --rmi all && \
    docker compose -f docker-compose-dev.yml pull && \
    GATEWAY_PORT=8001 docker compose -f docker-compose-dev.yml up -d;




