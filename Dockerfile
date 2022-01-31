FROM node:16

WORKDIR /app

COPY package.json package-lock.json index.js ./

RUN npm ci

CMD node index.js
