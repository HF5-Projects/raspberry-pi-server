FROM node:16
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# update and install dependency
RUN apt update && apt upgrade -y

# copy the app, note .dockerignore
COPY package.json /usr/src/app/

RUN npm install

COPY . /usr/src/app

RUN npm run build

EXPOSE 3001
ENV NUXT_PORT=3001

# Configure host
ENV HOST 0.0.0.0

CMD [ "npm", "run", "start" ]