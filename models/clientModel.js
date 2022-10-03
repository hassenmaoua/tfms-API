const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
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
    adresse: {
      type: String,
      default: '',
    },

    photo: {
      type: String,
      default: '',
    },

    isIndividual: {
      type: Boolean,
      default: false,
    },

    cCreator: {
      type: Object,
      default: null,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('Client', clientSchema);
