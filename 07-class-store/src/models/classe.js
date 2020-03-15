var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var _ = require('lodash');



var _Schema   = new Schema({
  name:String,
  code:String
});


module.exports = mongoose.model('Classe', _Schema);
