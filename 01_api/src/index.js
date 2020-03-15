const {EventEmitter} = require('events')
const mediator = new EventEmitter()

const express = require('express');
const router        = express.Router();

//const db = require ('./db');
const config = require('./config');
const server = require ('express-server-factory');
const _nats = require('@geekagency/microservice-common-libs').nats;
const _ = require('lodash');


const Translation = require('@geekagency/microservice-translation/src/express');
const Contact = require('./routes/contact');

//load routes




const normalizeParameters = (req,res,next)=>{
  //normalize ip address
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  req.ip_address = ip;
  //retrieve api key if present
  if(!_.isUndefined(req.query.api_key)){
      req.api_key = req.query.api_key;
  }else if(!_.isUndefined(req.body.api_key)){
      req.api_key = req.body.api_key;
  }else if(!_.isUndefined(req.headers['x-api-auth'])){
      req.api_key = req.headers['x-api-auth'];
  }
  next();
}

const authenticateMiddleware = (nats)=>{ return (req,res,next)=>{
  if(!_.isNil(req.api_key)){
    nats.requestOne('session.check', {session:req.api_key,user_agent:req.useragent.source,ip_address:req.ip_address}, {}, 1000, (response)=>{
      if(response instanceof Error || !response.success){
        res.status(500).send(response)
      }else{
        nats.requestOne('user.get', {id:response.session.user_id}, {}, 1000, (user_reply)=>{
          if(user_reply.success){
            req.user=user_reply.user;

            next();
          }else{
            next(new Error('authentication error: user not found'));
          }
        });
      }
    });

  }else{
    next (new Error('no api key provided'));
  }
}}

console.log (' -- WedPlan API --');


mediator.on('server.ready',(app)=>{
  console.log('server ready');
});

mediator.on('db.ready',()=>{


});

mediator.on('db.error',(error)=>{
  console.log('db error');
  console.log(error);
  process.exit();
});


process.on('uncaughtException', (err) => {
  console.error('Unhandled Exception', err)
})

process.on('uncaughtRejection', (err, promise) => {
  console.error('Unhandled Rejection', err)
})


console.log('db connected');
_nats({}).then((nats)=>{
  const middlewares = [

    require('cors')(),
    require('express-useragent').express(),
    normalizeParameters

  ];

  const routes = [
    router.use('/translation',Translation(nats)),
    router.use('/contact',Contact(nats)),
  ];

  server.start(config.serverSettings,mediator,middlewares,routes);
});
//db.connect(config.dbSettings,mediator);
