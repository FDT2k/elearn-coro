const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');

const connect = (settings,mediator)=>{
  console.log(settings);
  let uri = `mongodb://${settings.servers}/${settings.db}`;
  console.log(uri);
  mongoose.connect('mongodb://'+settings.servers+'/'+settings.db,{ user: settings.user,
  pass: settings.pass,
  useNewUrlParser: true
  }).then(()=>{
    mediator.emit('db.ready');
    mongoose.set('debug', settings.debug);
  }).catch((err)=>{

    mediator.emit('db.error',err);
  });

}

module.exports = Object.assign({},{connect});
