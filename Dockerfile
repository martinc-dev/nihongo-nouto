# Stage 1: Build Frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build:client

# Stage 2: Build Backend
FROM node:18-alpine AS backend-builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build:server

# Stage 3: Production Image
FROM node:18-alpine
WORKDIR /app

# Install production dependencies
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

# Copy built frontend
COPY --from=frontend-builder /app/build ./client

# Copy built backend
COPY --from=backend-builder /app/dist ./dist

# Environment variables (defaults)
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "dist/app/index.js"]

