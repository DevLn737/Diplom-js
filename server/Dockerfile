# Этап сборки, билдим typescript
FROM node:20.12.2-alpine AS builder
WORKDIR /server
COPY package.json ./
COPY tsconfig.json ./
RUN npm install
COPY . .
RUN npm run compile

# Этап продакшена, запускаем js
FROM node:20.12.2-alpine
WORKDIR /server
COPY --from=builder /server/dist ./dist
COPY package.json ./
RUN npm install --only=production
EXPOSE 4000
CMD ["node", "./dist/index.js"]
