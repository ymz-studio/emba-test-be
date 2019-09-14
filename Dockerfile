FROM node

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY ./dist .

RUN npm run build

EXPOSE 1234

CMD [ "node", "main.js" ]