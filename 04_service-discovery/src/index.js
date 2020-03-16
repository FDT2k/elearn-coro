const bs = require('@geekagency/microservice-common-libs').bootstrap;
const ms = require('./service-logic');
const config = require('./config')


bs.natsFactory((nats,logger)=>{
  ms(nats,logger).register();
},config);
