FROM node:10
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build
CMD [ "npm", "start" ]