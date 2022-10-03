const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nom: { type: String, default: null },
  prenom: { type: String, default: null },
  identFiscale: {
    type: String,
    unique: true,
    required: true,
  },
  email: { type: String, unique: true },
  password: { type: String },
  photo: {
    type: String,
    default: '',
  },
  token: { type: String },
});

module.exports = mongoose.model('User', userSchema);
