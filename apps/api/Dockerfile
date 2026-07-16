FROM node:22.13.1-alpine AS development

WORKDIR /workspace
RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/api/package.json ./apps/api/package.json
COPY packages ./packages
RUN pnpm install --frozen-lockfile

COPY apps/api ./apps/api
RUN pnpm --filter @stadiumsphere/api build

EXPOSE 3000
CMD ["pnpm", "--filter", "@stadiumsphere/api", "start"]
