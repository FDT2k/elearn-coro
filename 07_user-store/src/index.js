const bs = require('@geekagency/microservice-common-libs').bootstrap;
const ms = require('@geekagency/microservice-user-store');


const config = require('./config');



bs.natsAndMongoFactory((nats,logger)=>{
  ms(nats,logger).register();
},config);
