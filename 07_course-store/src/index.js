const bs = require('@geekagency/microservice-common-libs').bootstrap;
const ms = require('./service-logic');
const config = require('./config')


bs.natsEntityFactory((nats,logger,entity_plugin)=>{
  ms(nats,logger,entity_plugin).register();
},config);
