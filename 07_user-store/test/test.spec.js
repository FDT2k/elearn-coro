

const natsHelper=()=>{
  _nats = require('@geekagency/microservice-common-libs').nats;

  return _nats(
    {
      //removed config, it's now handled by package.json script line
      logger:console
    }
  );
}

let nats = null;

let prior_created_user_id = null;



beforeAll(async () => {
  nats = await natsHelper();

  await require('@geekagency/microservice-common-libs').mongoose({}).then(()=>{

    require('../src/service-logic')(nats,console).register();

  });
});

afterAll(async()=>{

  nats.shutdown();

})


test('should not reply', (done) => {
    nats.requestOne('blabla.lol', {},(reply)=>{
      expect(reply).toBeInstanceOf(Error)
      done();
    });
});


test('user.store should respond', (done) => {
  nats.requestOne('user.store',{},(reply)=>{
      expect(reply).toBeInstanceOf(Object)
      expect(reply.error.name).toBe('ParameterValidationError')
      done();
  });
});


test('user.store should respond with error when email is wrong', (done) => {
  nats.requestOne('user.store',{email:'foo','password':'bar'},(reply)=>{
      expect(reply).toBeInstanceOf(Object)

      expect(reply.error).toBeInstanceOf(Object)
      expect(reply.error.name).toBe('InvalidEmailError')
      done();
  });
});


test('user.store should respond when all parameters are ok', (done) => {

  nats.requestOne('user.store',{email:'foo@bar.fqdn','password':'bar'},(reply)=>{
      expect(reply).not.toBeInstanceOf(Error)


      expect(reply.error).not.toBeDefined()

      done();
  });
})

test('user.store should not add the same email twice', (done) => {

  nats.requestOne('user.store',{email:'foo@bar.fqdn','password':'bar'},(reply)=>{
      expect(reply).not.toBeInstanceOf(Error)
      expect(reply.error).toBeInstanceOf(Object)

    //  reply.should.not.be.an.Error();
    //  should(reply.error).be.an.Object();
      expect(reply.error.name).toBe('AlreadyRegisteredError')
    //  should(reply.error.name).be.exactly('AlreadyRegisteredError')
      done();
  });
})


test('user.store should add another email', (done) => {

  nats.requestOne('user.store',{email:'foofoo@bar.fqdn','password':'barbar'},(reply)=>{
    expect(reply).not.toBeInstanceOf(Error)
    expect(reply.error).not.toBeInstanceOf(Object)

    expect(reply.user).toBeInstanceOf(Object)
    //  should(reply.user).be.an.Object();
    expect(reply.user).toBeInstanceOf(Object)
    expect(reply.user.id).toBeDefined();
      //should(reply.user.id).not.be.empty();

    prior_created_user_id = reply.user.id;
    done();
  });
})



test('user.get should respond', (done) => {
  nats.requestOne('user.get',{},(reply)=>{
      expect(reply).not.toBeInstanceOf(Error)

      expect(reply.success).toBeFalsy();
      expect(reply.error).toBeInstanceOf(Object)
      done();
  });
});



test('user.get should respond with error', (done) => {
  nats.requestOne('user.get',{},(reply)=>{
    expect(reply).not.toBeInstanceOf(Error)
    expect(reply.success).toBeFalsy();
    expect(reply.error).toBeInstanceOf(Object)
    expect(reply.error.name).toBe('ParameterValidationError')
    done();
  });

});


test('user.get should return a user', (done) => {
  nats.requestOne('user.get',{email:'foofoo@bar.fqdn'}, async (reply)=>{



    expect(reply).not.toBeInstanceOf(Error)
    expect(reply).toBeInstanceOf(Object)
    expect(reply).toHaveProperty('user')
    expect(reply.user).toBeInstanceOf(Object)
    expect(reply.user).toHaveProperty('id')
    expect(reply.user).toHaveProperty('email')
    expect(reply.user).toHaveProperty('salt')


//    should(reply.user).be.an.Object();
    //should(reply.user.id).not.be.empty();
  //  should(reply.error).not.be.an.Object();
  //  should(reply.user).have.keys('id','email','password','salt');
    done();

  });


});


test('user.get should return a user with id', (done) => {
  nats.requestOne('user.get',{id:prior_created_user_id},(reply)=>{
    expect(reply).not.toBeInstanceOf(Error)
    expect(reply).toBeInstanceOf(Object)
    expect(reply).toHaveProperty('user')
    expect(reply.user).toBeInstanceOf(Object)
    expect(reply.user).toHaveProperty('id')
    expect(reply.user).toHaveProperty('email')
    expect(reply.user).toHaveProperty('salt')

    done();
  });

});



test('user.authenticate should respond error', (done) => {
  nats.requestOne('user.authenticate',{}, async(reply)=>{
    expect(reply).not.toBeInstanceOf(Error)
    expect(reply.error).toBeInstanceOf(Object)
    expect(reply.error.name).toBe('ParameterValidationError')


    done();
  });

});


test('user.authenticate should authenticate', async (done) => {
  nats.requestOne('user.authenticate',{email:'foofoo@bar.fqdn','password':'barbar'}, async(reply)=>{
    console.log(reply)
    expect(reply).not.toBeInstanceOf(Error)
    expect(reply).toBeInstanceOf(Object)
    expect(reply.error).not.toBeInstanceOf(Object)
    expect(reply).toHaveProperty('user')
    expect(reply.user).toBeInstanceOf(Object)
    expect(reply.user).toHaveProperty('id')
    expect(reply.user).toHaveProperty('email')
    expect(reply.user).toHaveProperty('salt')
        expect(reply.user).not.toHaveProperty('password')

    done();
  });

});
