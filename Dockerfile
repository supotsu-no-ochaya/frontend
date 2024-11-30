ARG NODE_VERSION=22

FROM node:${NODE_VERSION}-alpine AS builder

WORKDIR /code

COPY src/frontend/ ./
RUN npm clean-install
RUN npm run build

FROM pierrezemb/gostatic:latest AS runtime

LABEL description="Supotsu no Ochaya - Frontend"
LABEL website="https://supotsu-no-ochaya.github.io/"

COPY --from=builder /code/dist/ /srv/http/

EXPOSE 80

CMD ["-port", "80"]
