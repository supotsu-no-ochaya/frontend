FROM node:22-alpine as builder

WORKDIR /app

COPY src/frontend/ ./
RUN npm clean-install
RUN npm run build

FROM pierrezemb/gostatic:latest as runtime

LABEL description="Supotsu no Ochaya - Frontend"
LABEL website="https://supotsu-no-ochaya.github.io/"

COPY --from=builder /app/dist/ /usr/share/nginx/html/

EXPOSE 80
