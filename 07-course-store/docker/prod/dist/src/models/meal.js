var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var _ = require('lodash');

var mealSchema = new Schema(
  {
    name: String,
    meal_type: String,
    allergies: String,
    allergy_desc: String

  },{_id:false}
);


var _Schema   = new Schema({

    guest_id: Schema.ObjectId,
    attending:[{type:mealSchema}]
});


module.exports = mongoose.model('Meal', _Schema);
