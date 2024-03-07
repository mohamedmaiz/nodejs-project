const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
    username: {type: String , required: true},
    email : {type: String , required: true},
    phone: {type:String , required :false},
    location: {type:String , required : false},
    creationDate: {type : Date , required: true},
    updateDate: {type : Date , required: false}
});

module.exports = mongoose.model('userModel' , userModel);

