#!/usr/bin/bash

eval $(docker-machine env wedplan-manager-2)
docker stack deploy --with-registry-auth -c 100_docker/prod/docker-compose.yml e20
eval $(docker-machine env -u)
