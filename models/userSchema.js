const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
  userName : String,
  firstName:  String, // String is shorthand for {type: String}
  lastName: String,
  email:   String,
  password: String,
  todosId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Todo"
  },

});
const user=mongoose.model('User',userSchema);
module.exports=user;