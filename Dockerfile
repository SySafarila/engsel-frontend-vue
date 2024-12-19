FROM node:20.17-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG BACKEND_URL
ARG JWT_SECRET

ENV BACKEND_URL=${BACKEND_URL}
ENV JWT_SECRET=${JWT_SECRET}

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
