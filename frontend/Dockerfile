FROM node:21.7.3
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable pnpm && pnpm install
RUN corepack enable pnpm && pnpm run build
COPY . .
RUN corepack enable pnpm && pnpm start