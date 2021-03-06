const express    = require('express');
const router = express.Router();
const moment = require('moment');
const _ =require('lodash');

const factory = (nats)=>{

  router.route('/')
    .post ( (req,res)=>{
      const {code} = req.body;
      nats.requestOne('classroom-store.get',{code}, (response)=>{
        if(response instanceof Error){
          res.status(500).send({success:false,error:response})
        }else if(!response.success){
          res.status(404).send(response)
        }else{
          res.send(response);
        }
      },2000);
    });
  return router
}
module.exports = factory;
