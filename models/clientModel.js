const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
      required: true,
    },
    intitule: {
      type: String,
      default: '',
    },
    phone: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    identFiscale: {
      type: String,
      unique: true,
      required: true,
    },
    adresse: {
      type: String,
      default: '',
    },
    isHuman: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('Client', clientSchema);
