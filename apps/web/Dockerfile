FROM node:22.13.1-alpine AS development

WORKDIR /workspace
RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/web/package.json ./apps/web/package.json
COPY packages ./packages
RUN pnpm install --frozen-lockfile

COPY apps/web ./apps/web
EXPOSE 5173
CMD ["pnpm", "--filter", "@stadiumsphere/web", "dev"]
