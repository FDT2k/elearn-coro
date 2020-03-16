var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var moment = require('moment');
var _ = require('lodash');
var randomstring = require("randomstring");

const factory = (encodePassword) =>{
  var _Schema   = new Schema({

      email:String,
      password:String,
      register_date: Date,
      salt: String,
      memberOf:[
        {type:Schema.ObjectId, ref:'Team'}
      ],
      confirmed: {type:Boolean, default: false}

  });

  _Schema.statics.findByEmail = function(name,) {
    return this.findOne({ email: new RegExp(name, 'i') });
  };

  _Schema.statics.create = function(email,password,full_name) {
    let model = mongoose.model('User');
    let _user = new model();
    var salt = randomstring.generate({
      length: 16
    });
    _user.email = _.toLower(email);
    _user.salt = salt;
    _user.password =  encodePassword(password,salt);
    _user.fullName = full_name;
    return _user;
  };


  return mongoose.model('User', _Schema)
}

//factory export
module.exports = factory;
