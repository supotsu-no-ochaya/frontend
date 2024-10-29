FROM node:22-alpine as builder

WORKDIR /app

COPY src/frontend/package*.json ./
RUN npm install

COPY src/frontend/ ./
RUN npm run build

FROM nginx:stable-alpine as runtime

COPY --from=builder /app/dist/ /usr/share/nginx/html/

EXPOSE 80
