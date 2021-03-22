FROM node:12.15

#RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /usr/app

COPY package*.json ./

#RUN npm install

#RUN npm i -g @adonisjs/cli

COPY . .

EXPOSE 3333

#CMD [ "adonis", "serve", "--dev"]
