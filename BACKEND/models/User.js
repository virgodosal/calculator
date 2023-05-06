const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username : {
    type : String,
    required : true
  },
    isAdmin : {
    type : Boolean,
    default : false
  },
    timestamp : {
    type : Date,
    required : false
  },
    comments : {
    type : [String],
    required : false
  },
   calcStrings: {
    type: [String]
  }
 

});

module.exports = mongoose.model('Usercalcu', userSchema);
