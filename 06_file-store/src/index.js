const bs = require('@geekagency/microservice-common-libs').bootstrap;
const config = require('./config')
const express = require('@geekagency/microservice-common-libs').express;
var multer  = require('multer')
var upload = multer({dest:'/tmp/up'});


var os = require('os');
var ifaces = os.networkInterfaces();


Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      console.log(ifname + ':' + alias, iface.address);
    } else {
      // this interface has only one ipv4 adress
      console.log(ifname, iface.address);
    }
    ++alias;
  });
});


bs.natsFactory((nats,logger)=>{


  express({config:{port:0},logger,nats}).then(({app,server,helper})=>{

    helper.useBodyParser();

    const service_discovery = ()=> setTimeout(()=> {
      nats.publish('service-discovery.register',{node_id:'coucou',port:server.address().port})
      service_discovery();
    } , 5000)

    service_discovery();

    app.use('/',upload.array('data'),function(req, res,next) {
      console.log('coucou')
      console.log(req.files)
      res.send('ahi')
    })
  });
},config);
