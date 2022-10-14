ARG NODE_VERSION=16
# Use bullseye to be consistent across node versions.
FROM node:${NODE_VERSION}-bullseye-slim

RUN apt-get update

RUN apt-get install -y openssl

WORKDIR /usr/src/app
