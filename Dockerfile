# Use a base image with Node.js installed
FROM node:16 as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the Webpack application
RUN npm run build

# Use a lightweight base image with NGINX
FROM nginx:alpine

# Copy built Webpack files to NGINX default public directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Set the environment variable
ENV LOCALSTACK=true

# Expose port 3000
EXPOSE 3000

# Start NGINX when the container starts
CMD ["nginx", "-g", "daemon off;"]