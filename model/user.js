const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  fcm_token: String,
  timezone: String,
});

const User = mongoose.model('user', userSchema);
module.exports = User;