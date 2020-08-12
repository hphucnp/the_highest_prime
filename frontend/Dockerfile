FROM node:12.18.3 AS build-stage
WORKDIR /prime/
COPY . .
ENV NODE_ENV production
RUN yarn
RUN yarn build

FROM nginx:1.19.1-alpine
COPY --from=build-stage /prime/build/. /usr/share/nginx/html/
EXPOSE 80
