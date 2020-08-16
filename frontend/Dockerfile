FROM node:12.18.3 AS build-stage
WORKDIR /prime/
COPY . .
ARG REACT_APP_API='http://localhost:8080'
ENV NODE_ENV production
ENV REACT_APP_API ${REACT_APP_API}
RUN yarn
RUN yarn build

FROM nginx:1.19.1-alpine
ARG REACT_APP_API='http://localhost:8080'
ENV REACT_APP_API ${REACT_APP_API}
COPY --from=build-stage /prime/build/. /usr/share/nginx/html/
EXPOSE 80
