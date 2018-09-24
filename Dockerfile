FROM node:8-slim

USER node

RUN mkdir -p /home/node/app/

WORKDIR /home/node/app

COPY /pdf2cash_front/package*.json ./

RUN npm install 

COPY /pdf2cash_front/ ./

EXPOSE 3000


