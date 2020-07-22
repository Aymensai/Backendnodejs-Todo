const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var fileSchema = new Schema({

    fieldname : String,
    originalname: String,
    encoding: String,
    mimetype: String,
    destination: String,
    filename: String,
    path : String,
    size: Number
});
const file=mongoose.model('File',fileSchema);
module.exports=file;