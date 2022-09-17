FROM node:16-alpine
WORKDIR /opt/app
ADD package.json package.json
ADD yarn.lock yarn.lock
RUN yarn install
ADD . .

RUN yarn build
RUN yarn install --production --ignore-scripts
CMD [ "node", "./dist/main.js" ]