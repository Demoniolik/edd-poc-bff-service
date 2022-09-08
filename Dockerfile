FROM node:16.9.0-alpine
WORKDIR /bff
COPY /src /bff/
RUN npm install
RUN npm i -g nodemon
CMD ["nodemon", "/src/index.ts"]