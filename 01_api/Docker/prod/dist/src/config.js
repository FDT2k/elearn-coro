const crypto     = require('crypto');
var jwt = require('jsonwebtoken');

const dbSettings = {
  db: process.env.DB || 'saladin', //mongo catalog
  port: process.env.PORT || 27017,
  user: process.env.DB_USER || '',
  pass: process.env.DB_PASS || '',
  debug: true,
  servers: (process.env.DB_SERVERS) ? process.env.DB_SERVERS.split(',') : ["127.0.0.1"]
}


const authSettings = {
  JWT_KEY: process.env.JWT_KEY || "SuperSecretKeyOMG" , //CHANGE THIS
  JWT_CONFIG : {
    expiresIn: process.env.JWT_EXPIRES || "60m",
    issuer: 'saladin-api'
  },
  secret: process.env.SALT||'wut',
}

const serverSettings = {
  port: process.env.LISTEN_PORT || 3000
}

const passwordEncoder = function(password,salt){
/*  return crypto.createHmac('sha256', authSettings.secret)
                   .update(password)
                   .digest('hex');*/
  return  crypto.pbkdf2Sync(password,salt, 100000, 64, 'sha512').toString('hex');
}

const tokenEncoder = function (user){
  const {_id,email} = user;
  var token = jwt.sign({_id,email },authSettings.JWT_KEY,authSettings.JWT_CONFIG);
  return token;
}

module.exports = Object.assign({}, { dbSettings, authSettings, serverSettings, passwordEncoder,tokenEncoder });
