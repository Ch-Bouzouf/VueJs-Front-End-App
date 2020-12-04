FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN apk update
RUN apk add git 
RUN npm install
COPY . .
RUN npm run build:prod


FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]



# docker-composer up # to start the compilation process
# to install npm package run
# docker-compose exec web npm i bootstrap