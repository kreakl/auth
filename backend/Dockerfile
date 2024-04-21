FROM node:21-alpine as builder
WORKDIR /app
COPY tsconfig.json tsconfig.build.json package.json yarn.lock .env ./
RUN yarn install
COPY src ./src
RUN yarn build
