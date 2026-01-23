FROM node:20-alpine AS base
RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml ./

RUN --mount=type=secret,id=npmrc,target=/root/.npmrc pnpm install --frozen-lockfile

FROM base AS development
COPY . .

FROM development AS builder
RUN pnpm run build

FROM node:20-alpine AS production
RUN npm install -g pnpm
WORKDIR /app
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 3002

CMD ["sh", "-c", "npx prisma db push --schema=./schema.prisma --accept-data-loss --url=\"$DATABASE_URL\" && node dist/src/main.js"]
