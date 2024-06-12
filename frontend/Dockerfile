FROM node:lts-alpine

RUN mkdir /app
WORKDIR /app
COPY package.json .
RUN npm i 

COPY src src
COPY public public
COPY codegen.ts .
COPY next.config.mjs .
COPY tsconfig.json .



# CMD npm run dev
RUN npm run build
CMD npm run start