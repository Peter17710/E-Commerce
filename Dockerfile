FROM node:alpine
WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install
COPY . . 
COPY ./src ./src
COPY /.env ./.env
COPY ./db/connection.js ./db/connection.js
CMD ["npm" , "start"]