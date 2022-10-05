const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: { type: Number },

  nom: { type: String, default: null },
  prenom: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  photo: {
    type: String,
    default: '',
  },
  refreshToken: { type: String },
});

module.exports = mongoose.model('User', userSchema);
