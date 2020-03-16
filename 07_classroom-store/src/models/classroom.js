var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var _ = require('lodash');



var _Schema   = new Schema({
  name:String,
  code:String,
  school_id: Schema.ObjectId
});


module.exports = mongoose.model('classroom', _Schema);
