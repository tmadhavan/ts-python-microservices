FROM node:10.13-alpine
# ENV NODE_ENV devel
WORKDIR /usr/src/app
RUN apk add --no-cache bash
RUN npm install -g pm2

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install
COPY . ./
EXPOSE 3001
#RUN npm run build
CMD [ "npm", "run", "start:prod"]
