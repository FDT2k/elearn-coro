const express    = require('express');
const router = express.Router();
const proxy = require ('express-http-proxy')

const factory = (nats)=>{



  router.use('/upload',proxy('localhost:2222',{limit:'50mb',parseReqBody:false}))

  return router;
}


module.exports = factory;
