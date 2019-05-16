FROM node:10.13-alpine
# ENV NODE_ENV devel
WORKDIR /usr/src/app
RUN apk add --no-cache bash
RUN npm install -g pm2

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# RUN npm install --production --silent && mv node_modules ../
RUN npm install
COPY . .
EXPOSE 3000
RUN npm build
# CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]
CMD [ "node", "dist/app.js" ]