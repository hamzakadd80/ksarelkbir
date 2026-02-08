FROM node:18-slim

# Installation des dépendances pour Prisma/OpenSSL
RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . . 

# Start the app
CMD ["node", "index.js"]