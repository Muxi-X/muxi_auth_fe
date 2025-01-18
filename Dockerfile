FROM node:16

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

# Build static file
RUN yarn install
RUN yarn build

WORKDIR /usr/src/app/server

# Build server file
RUN yarn install

# Bundle app source
EXPOSE 3000
CMD [ "yarn", "start" ]