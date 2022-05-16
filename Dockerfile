FROM node
  
WORKDIR /usr/app

#Instalando as dependências
COPY package*.json ./
RUN npm install

#Copiando outros arquivos
COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]