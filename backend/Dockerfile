FROM node:18-slim

# Installation des dépendances pour Prisma/OpenSSL
RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npx prisma generate
RUN npm run build

EXPOSE 3000
CMD ["node", "dist/server.js"]