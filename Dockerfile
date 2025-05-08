FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG VITE_FINTECH_API_BASE_URL
ENV VITE_FINTECH_API_BASE_URL=$VITE_FINTECH_API_BASE_URL

ARG FINTECH_API_CONTAINER_NAME
ENV FINTECH_API_CONTAINER_NAME=$FINTECH_API_CONTAINER_NAME

RUN npm run build

RUN npm install -g serve

CMD ["sh", "-c", "until wget -qO- $FINTECH_API_CONTAINER_NAME:8080/actuator/health | grep 'UP'; do echo 'Waiting for API...'; sleep 3; done; serve -s dist -l 3000"]

EXPOSE 3000
