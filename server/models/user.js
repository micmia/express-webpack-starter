const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    index: true,
    unique: true,
    required: true
  },
  password: {
    type: String
  }
});

UserSchema.path('password').set(function (v) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(v, salt);

  return hash;
});

module.exports = mongoose.model('User', UserSchema);
