# Use a imagem oficial do Node.js como base
FROM node:16

# Defina o diretório de trabalho no container
WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package.json package-lock.json ./

# Instale as dependências listadas no package.json
RUN npm install

# Copiar todo o código da aplicação para o diretório de trabalho
COPY . .

# Expor as portas que a aplicação vai utilizar
EXPOSE 3000
EXPOSE 3001
