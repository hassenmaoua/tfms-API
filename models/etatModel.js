const mongoose = require('mongoose');

const etatSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
      required: true,
    },

    code: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    style: {
      type: String,
      required: true,
    },
  },

  {
    versionKey: false,
  }
);

module.exports = mongoose.model('Etat', etatSchema);
