/*

handle translations store
*/
const inspect = require('util').inspect;
const _ = require('lodash');
const {validate} = require ('parameter-validator')


const model = require('./models/contact');
let subs= [];

module.exports= (nats,logger, entity_store) =>{

  logger.info ('started');
  const {search_entity,upsert_entity,insert_entity,update_entity,get_entity,delete_entity,list_entity}
            = entity_store(nats,'contact','contacts',model);

  const register = ()=>{
    nats.subscribe('contact-store.search',search_entity)
    nats.subscribe('contact-store.upsert',upsert_entity)
    nats.subscribe('contact-store.insert',insert_entity)
    nats.subscribe('contact-store.update',update_entity)
    nats.subscribe('contact-store.get',get_entity)
    nats.subscribe('contact-store.delete',delete_entity)
    nats.subscribe('contact-store.list',list_entity)



    nats.subscribe('contact.subscribe',(payload,replyTo)=>{
      try{
        validate(payload,['ip','email','message'])
        insert_entity(payload,(reply)=>{
          if(reply.success){
            nats.publish('telegram.notify',reply)
          }
          nats.replyIfNeeded(replyTo,reply)
        })
      }catch(err){
        nats.replyIfNeeded(replyTo,err)
      }
    })
  }

  return {register}
}
