const express    = require('express');
const router = express.Router();
const moment = require('moment');
const _ =require('lodash');

const factory = (nats)=>{
  router.route('/register')
    .post ( (req,res)=>{
      const {email,password,full_name} = req.body;

      nats.requestOne('user.store', _.pick(req.body,['email','password']), (response)=>{
        if(response instanceof Error || !response.success){
          res.status(500).send(response)
        }else{
          res.send(response);
        }
      });
    });

  router.route('/authenticate')
    .post ( (req,res)=>{
      const {email,password} = req.body;

      nats.requestOne('session.authenticate', {email,password,user_agent:req.useragent.source,ip_address:req.ip_address}, (response)=>{
        console.log(response);
        if(response instanceof Error || !response.success){
          res.status(500).send(response)
        }else{
          res.send(response);
        }
      },2000);

    });

  router.route('/current')
    .get ((req,res)=>{

      nats.requestOne('session.check', {session:req.api_key,user_agent:req.useragent.source,ip_address:req.ip_address}, {}, 1000, (response)=>{
        if(response instanceof Error  || !response.success){
          res.status(500).send(response)
        }else{
          nats.requestOne('user.get', {id:response.session.user_id}, {}, 1000, (user)=>{
            res.send({user});
          });
        }
      });

    });
    return router;
}
module.exports = factory;
