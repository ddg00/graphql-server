from node:carbon-alpine

WORKDIR /usr/src/app

# Install yarn and other dependencies via apk
RUN apk update && apk add yarn python g++ make && rm -rf /var/cache/apk/*

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn run build

EXPOSE 4000

CMD [ "npm", "run", "start:dist" ]