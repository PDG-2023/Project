#!/bin/bash

sed -i "s/$(grep -e webapp docker/docker-compose.prod.yaml | sed -e 's/[]\/$*.^[]/\\&/g')/    image: nigelmann\/storeme-webapp:$1/" ./docker/docker-compose.prod.yaml
sed -i "s/$(grep -e api docker/docker-compose.prod.yaml | sed -e 's/[]\/$*.^[]/\\&/g')/    image: nigelmann\/storeme-api:$1/" ./docker/docker-compose.prod.yaml