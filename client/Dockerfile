# Этап сборки
FROM node:20.12.2-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Этап production
FROM nginx:1.21.0-alpine
COPY --from=builder /app/dist /var/www/dist
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
