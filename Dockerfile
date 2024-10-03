FROM node:16

# Criando diretório app
WORKDIR /usr/src/app

# Instala as dependências
COPY package*.json ./

RUN npm install

# Copia os arquivos para o container, menos os que estão no .dockerignore
COPY . .

RUN npm install @nestjs/typeorm typeorm pg

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run" , "start:prod" ]
