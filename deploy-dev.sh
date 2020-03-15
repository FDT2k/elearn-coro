#!/usr/bin/bash

eval $(docker-machine env gka-dev-manager-1)
docker stack deploy --with-registry-auth -c 100_docker/dev/docker-compose.yml gka_web
eval $(docker-machine env -u)
