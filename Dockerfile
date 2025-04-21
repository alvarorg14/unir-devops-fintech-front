FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG VITE_FINTECH_API_BASE_URL
ENV VITE_FINTECH_API_BASE_URL=$VITE_FINTECH_API_BASE_URL

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "dist", "-l", "3000"]

EXPOSE 3000
