FROM openjdk:19-jdk-alpine3.16

WORKDIR /usr/src/app

RUN apk add coreutils

RUN addgroup java && adduser -SG java java

USER java