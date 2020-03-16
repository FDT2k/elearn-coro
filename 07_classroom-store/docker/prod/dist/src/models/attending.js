var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var _ = require('lodash');

var diarySchema = new Schema(
  {

  },{_id:false}
);


var _Schema   = new Schema({

    guest_id: Schema.ObjectId,
    attending:[]
});


module.exports = mongoose.model('Attending', _Schema);
