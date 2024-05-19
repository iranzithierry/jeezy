FROM node:18
COPY package*.json .
RUN pnpm install
RUN pnpm run build
COPY . .
RUN pnpm start