# ==============================================================================
# apps/api/Dockerfile
# ==============================================================================

FROM node:20-alpine AS base
WORKDIR /app

# openssl est requis par Prisma sur Alpine
RUN apk add --no-cache openssl

COPY package.json package-lock.json* ./
COPY apps/api/package.json ./apps/api/
COPY packages/shared/package.json ./packages/shared/
RUN npm install


FROM base AS development
COPY tsconfig.base.json ./
COPY apps/api ./apps/api
COPY packages/shared ./packages/shared

# Génère le client Prisma au build (nécessaire pour l'import dans src/lib/prisma.ts)
WORKDIR /app/apps/api
RUN npx prisma generate

EXPOSE 3000
CMD ["npm", "run", "dev"]


FROM base AS build
COPY tsconfig.base.json ./
COPY apps/api ./apps/api
COPY packages/shared ./packages/shared
RUN cd apps/api && npx prisma generate
RUN npm run build --workspace=@finflow/api


FROM node:20-alpine AS production
RUN apk add --no-cache openssl
WORKDIR /app
COPY --from=build /app/apps/api/dist ./dist
COPY --from=build /app/apps/api/prisma ./prisma
COPY --from=build /app/apps/api/package.json ./
COPY --from=build /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/server.js"]