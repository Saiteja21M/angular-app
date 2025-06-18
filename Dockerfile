# Use official Node.js image as the base
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Replace the placeholder with the build ARG (default value can be set)
ARG BE_HOST
RUN sed -i "s|__API_URL__|${BE_HOST}|g" src/environments/environment.prod.ts

# Build the Angular app in production mode
RUN npm run build -- --output-path=dist --configuration production

# Use a lightweight Node.js image to serve the app
FROM node:20-alpine

WORKDIR /app

# Copy built files from previous stage
COPY --from=build /app/dist ./dist 

# Install a simple static file server
RUN npm install -g serve

# Expose port 5000
EXPOSE 5000

CMD ["serve", "-s", "dist/browser", "-l", "5000"]