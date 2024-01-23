# syntax=docker/dockerfile:experimental

# Build stage: Install yarn dependencies
# ===
FROM node:20 AS yarn-dependencies
WORKDIR /srv
ADD package.json .
ADD yarn.lock .
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn CYPRESS_INSTALL_BINARY=0 yarn install


# Build stage: Run "yarn run build-js"
# ===
FROM yarn-dependencies AS build-js
ADD . .
RUN yarn run build
RUN yarn run build-docs


# Build the production image
# ===
FROM ubuntu:jammy

# Set up environment
ENV LANG C.UTF-8
WORKDIR /srv

RUN apt-get update && apt-get install --no-install-recommends --yes python3

# Import code, build assets and mirror list
ADD . .
RUN rm -rf package.json yarn.lock .babelrc webpack.config.js
COPY --from=build-js /srv/docs .

# Setup commands to run server
ENTRYPOINT ["python3"]
CMD ["-m", "http.server", "80"]
