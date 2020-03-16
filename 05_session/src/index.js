const bs = require('@geekagency/microservice-common-libs').bootstrap;
const ms = require('@geekagency/microservice-session-handler');
const config = require('./config')


bs.natsFactory((nats,logger)=>{
  ms(nats,logger).register();
},config);
