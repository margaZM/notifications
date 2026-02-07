FROM node:20-alpine AS base
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./

FROM base AS development
RUN pnpm install
COPY . .
EXPOSE 3000
CMD ["pnpm", "dev", "-p", "3000", "-H", "0.0.0.0"]

FROM base AS builder
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM node:20-alpine AS runner
WORKDIR /app
RUN npm install -g pnpm
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./
RUN pnpm install --frozen-lockfile --prod

EXPOSE 3000
CMD ["sh", "-c", "pnpm start -p ${PORT:-3000} -H 0.0.0.0"]