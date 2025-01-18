<<<<<<< HEAD
FROM node:16
=======
FROM node:16.20.2
>>>>>>> e5947a243fd766c5625a702b3daafb036879b9dc

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

# Build static file
<<<<<<< HEAD
RUN yarn install
RUN yarn build
=======
RUN npm install --registry=https://registry.npmmirror.com
RUN npm run build
>>>>>>> e5947a243fd766c5625a702b3daafb036879b9dc

WORKDIR /usr/src/app/server

# Build server file
<<<<<<< HEAD
RUN yarn install
=======
RUN npm install --registry=https://registry.npmmirror.com
>>>>>>> e5947a243fd766c5625a702b3daafb036879b9dc

# Bundle app source
EXPOSE 3000
CMD [ "yarn", "start" ]