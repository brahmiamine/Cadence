FROM node:22-bookworm-slim
RUN apt-get update -y && apt-get install -y --no-install-recommends openssl ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build
ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0
EXPOSE 3000
# Applique les migrations puis démarre le serveur.
CMD ["sh", "-c", "npx prisma migrate deploy && exec npx next start -H 0.0.0.0 -p 3000"]
