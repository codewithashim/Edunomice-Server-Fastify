# Base stage for shared configurations
FROM node:20 AS base
WORKDIR /app
ENV NODE_ENV=development

# Dependencies stage
FROM base AS dependencies
COPY package*.json ./
RUN npm ci

# Build stage
FROM dependencies AS build
COPY . .
RUN npm run build

# Development stage
FROM base AS development
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose the port the app runs on
ARG PORT
ENV PORT=${PORT}
EXPOSE ${PORT}

# Start the application in development mode
CMD ["npm", "run", "dev"]