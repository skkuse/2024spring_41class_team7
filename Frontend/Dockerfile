<<<<<<< HEAD
FROM node:14-alpine
=======
FROM node:16-alpine
>>>>>>> b5f2d9130d8143d5d4b9ed685ec013a43780fb62

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . ./

RUN yarn build

CMD ["yarn", "start"]
