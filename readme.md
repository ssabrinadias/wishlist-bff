# Wishlist BFF

Este projeto é o Backend for Frontend (BFF) para a aplicação Wishlist. Ele serve como uma camada intermediária entre o frontend e os serviços de backend, proporcionando uma interface adaptada às necessidades do frontend.


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

### Uso import DB

```
mongoimport --uri "mongodb://localhost:27017/store" --collection User --jsonArray --file mocks/mock-user.json --legacy --type json --drop --jsonArray --file "mocks/mock-user.json" --username monty --password pass --authenticationDatabase admin `
```

```
mongoimport --uri "mongodb://localhost:27017/store" --collection Product --jsonArray --file mocks/mock-products.json --legacy --type json --drop --jsonArray --file "mocks/mock-products.json" --username monty --password pass --authenticationDatabase admin 
```