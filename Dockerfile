# Tahap 1: Build aplikasi
FROM node:18 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .

# Build aplikasi Next.js menjadi versi production
RUN npm run build

# Tahap 2: Jalankan hasil build dengan image yang lebih ringan
FROM node:18-alpine

WORKDIR /app

# Salin hasil build dari tahap pertama
COPY --from=builder /app ./

# Set environment variable
ENV NODE_ENV=production

# Expose port default Next.js (3000)
EXPOSE 3000

# Jalankan server Next.js
CMD ["npm", "run", "start"]
