# Base image
FROM node:23-slim

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Expose port
EXPOSE 3002

# Start the application
CMD ["npm", "start"]
