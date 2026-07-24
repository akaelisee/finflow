# ==============================================================================
# apps/web/Dockerfile
# ==============================================================================

FROM node:20-alpine AS base
WORKDIR /app
COPY package.json package-lock.json* ./
COPY apps/web/package.json ./apps/web/
COPY packages/shared/package.json ./packages/shared/
RUN npm install


FROM base AS development
COPY tsconfig.base.json ./
COPY apps/web ./apps/web
COPY packages/shared ./packages/shared

WORKDIR /app/apps/web
EXPOSE 5173
CMD ["npm", "run", "dev"]


FROM base AS build
COPY tsconfig.base.json ./
COPY apps/web ./apps/web
COPY packages/shared ./packages/shared
RUN npm run build --workspace=web

FROM nginx:alpine AS production
COPY --from=build /app/apps/web/dist /usr/share/nginx/html
EXPOSE 80