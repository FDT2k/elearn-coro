var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var _ = require('lodash');



var _Schema   = new Schema({
  name:String
});


module.exports = mongoose.model('school', _Schema);
