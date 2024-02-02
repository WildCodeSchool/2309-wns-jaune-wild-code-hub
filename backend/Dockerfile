FROM node:16-alpine3.14

RUN mkdir /app
WORKDIR /app
COPY package.json .
RUN npm i 

COPY src src
# COPY public public
COPY codegen.ts .

COPY tsconfig.json .


CMD npm run start