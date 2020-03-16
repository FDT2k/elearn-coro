var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var _ = require('lodash');



var _Schema   = new Schema({
  name: String,
  email:String,
  message:String,
  date: {type:Date, default: Date.now},
  ip: String,
  status: {type:String, default:'posted'}
});


module.exports = mongoose.model('WebsiteContact', _Schema);
