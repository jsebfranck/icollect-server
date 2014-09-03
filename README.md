icollect-server
===============
# Prerequisites

Installer nvm
nvm install v0.10.28
nvm use v0.10.28

# Launch server

cd icollect-server
npm install
npm start


# Install HBASE

http://hbase.apache.org/book/quickstart.html

# Create table

hbase(main):010:0> create 'collect', 'facts'

# Launch HBASE rest server

./bin/hbase rest start -p 8080

# Access to server

Collect service :

```
curl -H "Content-Type: application/json" -d '{"firstname":"xyz","lastname":"xyz","birthDate":1970,"collectorId":"xyz"}' http://localhost:3000/collect
```

Login service :

```
curl -H "Content-Type: application/json" -d '{"login":"xyz","password":"xyz"}' http://localhost:3000/login

