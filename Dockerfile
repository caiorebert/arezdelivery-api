# Estágio 1: Instalação
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Estágio 2: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Estágio 3: Produção
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

# Copia apenas o necessário para rodar
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 3001

# O comando padrão do Nest buildado
CMD ["node", "dist/main"]