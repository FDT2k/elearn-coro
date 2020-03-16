const express    = require('express');
const router = express.Router();
const proxy = require ('express-http-proxy')

const factory = (nats)=>{

  const selectProxyHost = _=> new Promise( (resolve,reject)=> nats.requestOne('service-discovery.get',{service_type:'file_upload'},resolve,1000))

  router.use('/upload',proxy(selectProxyHost,{limit:'50mb',parseReqBody:false}))

  return router;
}


module.exports = factory;
