# https://docs.docker.com/samples/library/node/
ARG NODE_VERSION=16.16
# https://github.com/Yelp/dumb-init/releases
ARG DUMB_INIT_VERSION=1.2.5

# Build container
FROM node:${NODE_VERSION}-alpine3.16 AS build
ARG DUMB_INIT_VERSION

WORKDIR /home/node

RUN apk add --update --no-cache curl py-pip && \
    wget -O dumb-init -q https://github.com/Yelp/dumb-init/releases/download/v${DUMB_INIT_VERSION}/dumb-init_${DUMB_INIT_VERSION}_x86_64 && \
    chmod +x dumb-init
ADD ./package.json ./package.json
ADD ./yarn.lock ./yarn.lock

ADD . /home/node

RUN yarn install

RUN yarn deploy && yarn cache clean

# Runtime container
FROM node:${NODE_VERSION}-alpine3.16

WORKDIR /home/node

COPY --from=build /home/node /home/node

EXPOSE 3000

CMD ["./dumb-init", "yarn", "start"]