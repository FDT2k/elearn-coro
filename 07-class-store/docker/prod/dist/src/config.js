let suffix='';


if(process.env.MONGO_REPLICASET){
  suffix +='?replicaSet='+process.env.MONGO_REPLICASET

}
const databaseSettings = {
  db: process.env.DB || 'wedplan', //mongo catalog
  port: process.env.PORT || 27017,
  user: process.env.DB_USER || '',
  pass: process.env.DB_PASS || '',
  debug: true,
  servers: (process.env.DB_SERVERS) ? process.env.DB_SERVERS.split(',') : ["127.0.0.1"],
  suffix

}

module.exports = {databaseSettings,package:require('../package.json')}
