FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN rm -rf node_modules && yarn install --frozen-lockfile
CMD npm run dev

