FROM node:20-alpine AS base
RUN npm install -g pnpm
WORKDIR /app

ARG GITHUB_TOKEN

COPY package.json pnpm-lock.yaml ./

RUN if [ -n "$GITHUB_TOKEN" ]; then \
      echo "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" > .npmrc && \
      echo "@margazm:registry=https://npm.pkg.github.com" >> .npmrc; \
    fi

RUN pnpm install --frozen-lockfile

RUN rm -f .npmrc

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

COPY --from=builder /app/node_modules/@margazm/database/dist/generated/client/schema.prisma ./schema.prisma

EXPOSE 3003

CMD ["pnpm", "run", "start:deploy"]