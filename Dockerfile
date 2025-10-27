FROM node:20-alpine AS builder

# We set the working dir inside the docker
WORKDIR /app

# Copy package.json and package-lock.json to the working dir
COPY package*.json ./

# Install dependencies
RUN npm ci 

# Copy the source code
COPY . .

# Build the application in production mode
RUN npm run build

# This is the stage 2 using a minimal web server to serve the built app
FROM nginx:1.25-alpine

# Copy the built app from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Use custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]