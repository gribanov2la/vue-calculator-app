# base image
FROM node:9.4

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ADD package.json /usr/src/app/package.json

# start app
CMD ["npm", "start"]
