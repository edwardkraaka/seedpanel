# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Accept build arguments
ARG NEXT_PUBLIC_SEED_PHRASE
ARG NEXT_PUBLIC_CASE_NUMBER
ARG NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN
ARG NEXT_PUBLIC_CHATWOOT_BASE_URL

# Make them available as environment variables during build
ENV NEXT_PUBLIC_SEED_PHRASE=$NEXT_PUBLIC_SEED_PHRASE
ENV NEXT_PUBLIC_CASE_NUMBER=$NEXT_PUBLIC_CASE_NUMBER
ENV NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN=$NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN
ENV NEXT_PUBLIC_CHATWOOT_BASE_URL=$NEXT_PUBLIC_CHATWOOT_BASE_URL

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Copy standalone server from builder
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Set hostname
ENV HOSTNAME="0.0.0.0"

# Start the application with node (faster than npm start)
CMD ["node", "server.js"]
