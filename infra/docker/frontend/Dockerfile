FROM node:18-alpine

FROM nginx

WORKDIR /srv

COPY ./apps/frontend/dist/frontend ./app
COPY ./infra/docker/frontend/default.conf /etc/nginx/conf.d/default.conf
