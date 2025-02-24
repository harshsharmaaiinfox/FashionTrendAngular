# --- Dockerfile (Angular Frontend) ---
    FROM node:18-alpine

    WORKDIR /app
    
    COPY package*.json ./
    
    RUN npm install -g @angular/cli
    RUN npm install --legacy-peer-deps
    
    COPY . .
    
    CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]
    
    EXPOSE 4200
    