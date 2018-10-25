FROM node:9.6-slim

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY pdf2cash_front/package.json /app/package.json

RUN npm install 

ADD pdf2cash_front/ /app/

CMD npm run dev
