const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', usersSchema);

module.exports = User;