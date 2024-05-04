FROM node:20.12.2-alpine
WORKDIR /server
COPY ./package.json .
RUN npm i
COPY . .
EXPOSE 4000
CMD ["npm", "start"]