ARG NODE_VERSION=22

FROM node:${NODE_VERSION}-alpine AS builder

WORKDIR /code

COPY src/frontend/package*.json ./
RUN npm clean-install
COPY src/frontend/ ./
# todo: change back to `npm run build`
RUN npm run build-only

FROM pierrezemb/gostatic:latest AS runtime

LABEL description="Supotsu no Ochaya - Frontend"
LABEL website="https://supotsu-no-ochaya.github.io/"

COPY --from=builder /code/dist/ /srv/http/

EXPOSE 80

CMD ["-port", "80"]
