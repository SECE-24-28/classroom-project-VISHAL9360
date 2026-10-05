# ==============================================================================
# SALESTORM ARFA: Production-Grade Vite React Frontend Container
# Node.js 20 Alpine with Non-Root Execution & Docker Network Host Binding
# ==============================================================================
FROM node:20-alpine

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy application source code
COPY . .

EXPOSE 5173

# Expose Vite on 0.0.0.0 so host and bridge network can connect seamlessly
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
