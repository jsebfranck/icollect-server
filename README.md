icollect-server
===============
# Prerequisites

Installer nvm
nvm install v0.10.28
nvm use v0.10.28

# Launch server

cd icollect-server
npm install
node bin/www

# Access to server

Collect service :

```
curl -H "Content-Type: application/json" -d '{"firstname":"xyz","lastname":"xyz","birthDate":1970,"collectorId":"xyz"}' http://localhost:3000/collect
```

Login service :

```
curl -H "Content-Type: application/json" -d '{"login":"xyz","password":"xyz"}' http://localhost:3000/login

