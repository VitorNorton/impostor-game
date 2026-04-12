# Etapa 1: Instala e faz o Build do React
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Prepara o servidor Nginx de alta performance
FROM nginx:alpine
# Cria a pasta exata do seu subdomínio
RUN mkdir -p /usr/share/nginx/html/impostor-game
# Copia os arquivos prontos do React para dentro dessa pasta
COPY --from=build /app/build /usr/share/nginx/html/impostor-game

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]