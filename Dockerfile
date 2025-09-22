FROM node:20

# Diretório de trabalho
WORKDIR /usr/src/app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta usada pelo Vite
EXPOSE 5173

# Executa o Vite no modo dev acessível externamente
CMD ["npm", "run", "dev", "--", "--host"]
