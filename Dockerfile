# ===== Build Angular =====
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# ===== Nginx =====
FROM nginx:alpine

# Copia build Angular
COPY --from=build /app/dist/lifegoals/browser /usr/share/nginx/html

# Copia configuración personalizada nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]