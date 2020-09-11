FROM node:14.10

WORKDIR /express_ejs_crud

COPY ./package*.json ./

RUN npm install

COPY ./ ./

EXPOSE 3000

CMD ["npm", "start"]