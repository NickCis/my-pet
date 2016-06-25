FROM node

RUN mkdir -p /usr/src/my-pet
WORKDIR /usr/src/my-pet

COPY package.json /usr/src/my-pet
RUN npm install

COPY . /usr/src/my-pet

RUN npm run webpack

EXPOSE 8080

CMD [ "npm", "start" ]
