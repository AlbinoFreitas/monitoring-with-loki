FROM node:14-alpine3.14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only-production

COPY . .

CMD [ "npm", "run", "start" ]