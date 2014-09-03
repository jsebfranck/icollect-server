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


### Install HBASE

http://hbase.apache.org/book/quickstart.html

# Use the following hbase documentation

<configuration>
  <property>
    <name>hbase.rootdir</name>
    <value>file:///var/tmp/hbase/hbase</value>
  </property>
  <property>
    <name>hbase.zookeeper.property.dataDir</name>
    <value>/var/tmp/hbase/zookeeper</value>
  </property>
</configuration>

# Create table

hbase(main):010:0> create 'collect', 'facts'

# List table entries

hbase(main):003:0> scan 'collect'

# Launch HBASE rest server

./bin/hbase rest start -p 8080

### Access to server

Collect service :

```
curl -H "Content-Type: application/json" -d '{"firstname":"xyz","lastname":"xyz","birthDate":1970,"collectorId":"xyz"}' http://localhost:3000/collect
```

Login service :

```
curl -H "Content-Type: application/json" -d '{"login":"xyz","password":"xyz"}' http://localhost:3000/login
