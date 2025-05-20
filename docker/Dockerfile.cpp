FROM alpine:3.8

WORKDIR /usr/src/app

RUN apk add build-base

RUN apk add coreutils

# RUN addgroup cpp && adduser -SG cpp cpp

# USER cpp
