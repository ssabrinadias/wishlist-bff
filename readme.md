# Wishlist BFF

Este projeto é o Backend for Frontend (BFF) para a aplicação Wishlist. 


## Instalação do BFF
Para instalar o projeto você deve ter o docker e o mongo instalados previamente em sua maquina.

Para configurar o projeto localmente, siga os passos abaixo:

```
docker pull prismagraphql/mongo-single-replica:5.0.3
```

```
docker run --name mongo \
      -p 27017:27017 \
      -e MONGO_INITDB_ROOT_USERNAME="monty" \
      -e MONGO_INITDB_ROOT_PASSWORD="pass" \
      -d prismagraphql/mongo-single-replica:5.0.3
```

### Mongoimport Instalação
Para importar dados no MongoDB usando a ferramenta mongoimport siga os passos abaixo para instalação de acordo com seu sistema:

####  mac:
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

brew tap mongodb/brew

brew install mongodb-community@6.0
```
Verifique se foi instalado corretamente
```
mongod --version
```

#### windows:
acesse o link:
[MongoDB Command Line Database Tools Download](https://www.mongodb.com/try/download/database-tools)

Verifique se foi instalado corretamente
```
mongoimport --version
```

#### Ubuntu

```
apt-get update && apt-get install -y wget gnupg && \
    wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | apt-key add - && \
    echo "deb http://repo.mongodb.org/apt/debian buster/mongodb-org/5.0 main" | tee /etc/apt/sources.list.d/mongodb-org-5.0.list && \
    apt-get update && \
    apt-get install -y mongodb-database-tools
```

### CLone do Repositorio

```
git clone https://github.com/ssabrinadias/wishlist-bff.git

cd wishlist-bff

yarn install
```

### Uso import DB
Certifique-se que esta dentro do diretorio wishlist-bff e execute os comandos abaixo:

```
mongoimport --uri "mongodb://localhost:27017/store" --collection User --jsonArray --file mocks/mock-user.json --legacy --type json --drop --jsonArray --file "mocks/mock-user.json" --username monty --password pass --authenticationDatabase admin `
```

```
mongoimport --uri "mongodb://localhost:27017/store" --collection Product --jsonArray --file mocks/mock-products.json --legacy --type json --drop --jsonArray --file "mocks/mock-products.json" --username monty --password pass --authenticationDatabase admin 
```



## Scripts

### Desenvolvimento

To start the development server:

```bash
yarn start

Running on port http://localhost:9000/
```

To run the tests:

```bash
 yarn test
```