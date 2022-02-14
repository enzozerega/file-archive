FROM node:16.14.0-alpine

WORKDIR /file-archive/server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]