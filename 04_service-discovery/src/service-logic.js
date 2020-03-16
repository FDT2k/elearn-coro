const  {compose,curry,assign2,keys,map,filter} =require('@geekagency/composite-js');
const moment = require('moment');
 const Minux = curry((initialState,reducer)=>{
  let state = initialState;
  return ({
    dispatch: action=>{
      state=reducer(state,action)
      return state;
    },
    getState: _=> state
  })
})


const initialState = {
  services:{

    byNode:{

    },
    list: [],
  }
}

const ADD_SERVICE = 'ADD_SERVICE';

 const service = (state={},action)=>{
  return {...action.payload,last_seen:moment().unix()}
}

 const service_list = (state=[],action)=>{
  switch(action.type){
    case ADD_SERVICE:
      return [...state,service({},action)]
    break;
  }
  return state;
}
const service_list_by_node = (state={},action)=>{
 switch(action.type){
   case ADD_SERVICE:
      const serv = service({},action);
     return {...state,[serv.node_id]:serv}
   break;
 }
 return state;
}

const list = object =>  compose(map(item=>object[item]),keys)(object)

 const reducer= (state=initialState,action)=>{
  switch(action.type){
    case ADD_SERVICE:
      const byNode = service_list_by_node(state.services.byNode,action);
      return {...state,
                services:{
                    byNode:{...byNode},
                    list: list(byNode)
                }
             }
    break;
  }
  return state;
}

module.exports= (nats)=>{

  let store = Minux(initialState,reducer)
  /*
  payload is
  {
    node_id:'uuid',
    service: 'file_upload',
    ip:'',
    port:''
  }

  */
  const register_service = (payload,replyTo) => {
    store.dispatch({type:ADD_SERVICE,payload})
    console.log(store.getState().services)
  }


  const get_service = (payload,replyTo)=>{
    const reply = filter(item=> item.service_type=payload.service_type, store.getState().services.list)
    nats.replyIfNeeded(replyTo,reply)
  }

  const register = ()=>{
    nats.subscribe('service-discovery.register',register_service);
    nats.subscribe('service-discovery.get',get_service);
  }
  return {register}
}
