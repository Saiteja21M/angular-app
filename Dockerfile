# Use official Node.js image as the base
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular app in production mode
RUN npm run build -- --output-path=dist

# Use a lightweight Node.js image to serve the app
FROM node:20-alpine

WORKDIR /app

# Copy built files from previous stage
COPY --from=build /app/dist ./dist

# Install a simple static file server
RUN npm install -g serve

# Expose port 5000
EXPOSE 5000

# Serve the Angular app
CMD ["serve", "-s", "dist/browser", "-l", "5000"]