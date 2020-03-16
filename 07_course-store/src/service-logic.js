/*

handle translations store
*/
const inspect = require('util').inspect;
const _ = require('lodash');
const {validate} = require ('parameter-validator')


const model = require('./models/course');
let subs= [];

module.exports= (nats,logger, entity_store) =>{

  logger.info ('started');
  const {search_entity,upsert_entity,insert_entity,update_entity,get_entity,delete_entity,list_entity}
            = entity_store(nats,'classe','classes',model);

  const register = ()=>{
    nats.subscribe('classe-store.search',search_entity)
    nats.subscribe('classe-store.upsert',upsert_entity)
    nats.subscribe('classe-store.insert',insert_entity)
    nats.subscribe('classe-store.update',update_entity)
    nats.subscribe('classe-store.get',get_entity)
    nats.subscribe('classe-store.delete',delete_entity)
    nats.subscribe('classe-store.list',list_entity)
  }

  return {register}
}
