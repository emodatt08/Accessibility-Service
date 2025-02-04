# Use an official Node.js 18 LTS image
FROM node:18-alpine

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install only production dependencies (if you plan on running tests or migrations separately, adjust as needed)
RUN npm install --production

# Copy the rest of the application source code
COPY . .

# Build the TypeScript project (ensure your tsconfig.json "outDir" is set appropriately, e.g., "dist")
RUN npm run build

# Expose the port the server runs on (use the same port as specified in your .env file, typically 3000)
EXPOSE 3000

# Command to run the compiled server (adjust the entry point if needed)
CMD ["node", "dist/server.js"]
