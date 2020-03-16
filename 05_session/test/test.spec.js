/* eslint-env mocha */
const should = require('should')
const moment = require('moment');
const _ = require ('lodash');

let crypto = require('crypto');


const natsHelper=()=>{
  var _nats = require('@geekagency/microservice-common-libs').nats;
  return _nats(
    {
      //removed config, it's now handled by package.json script line
    }
  );
}

let nats = null;

describe('Session Microservice',async () => {
  before(async function() {
    nats = await natsHelper();
    require('../src/service-logic')(nats)
   // runs before all tests in this block
 });

  it('should start', () => {

  //  should(require('../src/index')()).be.a.Promise()
  //  should(require('../src/index')()).be.rejected();

  });

  it('should not reply', (done) => {
    //  console.log(nats);
      nats.requestOne('blabla.lol', {},(reply)=>{
        should(reply).be.Error();
        done();
      });
  });

  it('authienticate should  reply even with no parameters', (done) => {

      nats.requestOne('user.authenticate', {}, (reply)=>{
        should(reply).not.be.Error();
        should(reply.success).be.exactly(false);
        should(reply.error).be.an.Object();
        done();
      });


  });

  it('authenticate should reply with parameter (also testing that the ms will answer even if its dependant ms arent up)', (done) => {

      nats.requestOne('user.authenticate', {'email':'blabla','password':'blabla','user_agent':'hello','ip_address':'testing'},(reply)=>{
        should(reply).not.be.Error();
        should(reply.success).be.exactly(false);
        done();
      },2000);

  }).timeout(2500);

  /*
  Authentication test. with an injected microservice reply
  */
  it('authenticate should work', (done) => {
      let sid = nats.subscribe('user.get',(payload,replyTo)=>{

        nats.reply(replyTo,{
          success:true,
          user:{
            id:"foo",
            salt:"bar",
            password:crypto.pbkdf2Sync('foofoo','bar', 100000, 64, 'sha512').toString('hex')
          }
        });
      });

      nats.requestOne('user.authenticate', {'email':'blabla','password':'foofoo','user_agent':'tester','ip_address':'testing'}, (reply)=>{
        should(reply).not.be.Error();
        should(reply.success).be.exactly(true);
        should(reply.session).not.be.empty();
        nats.unsubscribe(sid);
        done();

      },2000);

  });
  it('session.check should  reply even with no parameters', (done) => {

      nats.requestOne('session.check', {},(reply)=>{
        should(reply).not.be.Error();
        should(reply.success).be.exactly(false);
        should(reply.error).be.an.Object();
        done();
      });


  });


  it('session.check should work after authentication', (done) => {
      let sid = nats.subscribe('user.get',(payload,replyTo)=>{
        nats.publish(replyTo,{
          success:true,
          user:{
            id:"foo",
            salt:"bar",
            password:crypto.pbkdf2Sync('foofoo','bar', 100000, 64, 'sha512').toString('hex')

          }
        });
      });

      nats.requestOne('user.authenticate', {'email':'blabla','password':'foofoo','user_agent':'tester','ip_address':'testing'}, (reply)=>{
        //console.log(reply);
        should(reply).not.be.Error();
        should(reply.success).be.exactly(true);
        should(reply.session).be.a.String()

        nats.requestOne('session.check',{session:reply.session,user_agent:"tester",ip_address:"testing"},(session_reply)=>{

          should(session_reply).not.be.Error();
          should(session_reply.success).be.exactly(true);
          should(session_reply.session).be.an.Object();

          should(session_reply.session.user_id).be.a.String().and.not.empty();
          should(session_reply.session.session).be.an.String().and.not.empty();
          should(session_reply.session.expires).be.a.String().and.not.empty();
          should(moment(session_reply.session.expires).isValid()).be.exactly(true);
          should(moment(session_reply.session.expires).isAfter(moment())).be.exactly(true);
          nats.unsubscribe(sid);
          done();

        })

      });

  });




});
