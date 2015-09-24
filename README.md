# Express-Mongodb-Server
An express web server that receives MongoDB queries as an http GET request and responses with all matched documents.

## Setup
```bash

npm install
export ExpressMongo_HOST=your_mongod_host
export ExpressMongo_PORT= your_mongod_port
export ExpressMongo_USER= your_mongod_user_name
export ExpressMongo_PW= your_mongod_password
export ExpressMongo_DB= your_mongod_db_name
export ExpressMongo_COLLECTION= your_mongod_collection_name

```

## Usage

This example uses: [httpie](https://github.com/jkbrzt/httpie)

```bash

node ./index.js
http GET http://localhost:6000/find q=='{"n":"com.evernote"}' p=='{"t":1}'
```