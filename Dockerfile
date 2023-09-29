FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm ci --only=production
CMD npm run dev