FROM alpine:3.8

WORKDIR /usr/src/app

RUN apk add build-base

RUN apk add coreutils