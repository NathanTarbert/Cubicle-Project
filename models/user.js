const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const usersSchema = new Schema({

  username: {
    type: String,
    required: true,
    trim: true,
  }, 
  password: {
    type: String,
    required: String,
    trim: true,
    minlength: 4,
    validate(value){
      if(value.toLowerCase().includes('password' || 'pa$$word')){
        throw new Error('Password cannot be the word `password`');
      }
    }
  },
  tokens: [{
    token: {
      type: String,
    required: true
    }    
  }]
});
usersSchema.methods.generateAuthToken = async function(){ 
const user = this;
const token = jwt.sign({_id:user.id.toString()},"thisismynewcourse");
user.tokens = user.tokens.concat({token});
await user.save();
return token;
};
const User = mongoose.model('User', usersSchema);
{}
module.exports = User;