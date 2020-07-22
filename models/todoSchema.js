const mongoose = require('mongoose');
 
let TodoSchema = new mongoose.Schema({
   title: { type: String, required: [true, "can't be blank"], index: true },
   description: { type: String, required: [true, "can't be blank"], index: true }
}, { timestamps: true });
 
 
const Todo=mongoose.model('Todo', TodoSchema);
module.exports=Todo;