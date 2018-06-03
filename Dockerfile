FROM node:9

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install

COPY ./app /usr/src/app

EXPOSE 3000
CMD [ "npm", "start" ]