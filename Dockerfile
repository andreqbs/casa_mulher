# Stage 1: build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: serve
FROM nginx:alpine

# gettext fornece o envsubst usado para substituir FLORA_API_TOKEN no nginx.conf
RUN apk add --no-cache gettext

COPY --from=builder /app/dist /usr/share/nginx/html

# nginx.conf usa ${FLORA_API_TOKEN} — substituído pelo envsubst no startup
COPY nginx.conf /etc/nginx/templates/default.conf.template

EXPOSE 80

# envsubst substitui apenas FLORA_API_TOKEN, preservando variáveis nativas do nginx ($uri, $http_origin, etc.)
CMD ["/bin/sh", "-c", "envsubst '${FLORA_API_TOKEN}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
