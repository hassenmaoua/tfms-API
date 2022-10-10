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
    identifiantFiscal: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
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
      default:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
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
