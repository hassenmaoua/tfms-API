const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
      required: true,
    },
    dopiece: {
      type: String,
      required: true,
    },
    dateDoc: {
      type: String,
      default: new Date(Date.now())
        .toLocaleDateString()
        .replace('/', '-')
        .replace('/', '-'),
    },

    article: {
      type: Array,

      _id: {
        type: Number,
        required: true,
      },
      intitule: {
        type: String,
        required: true,
      },
      quantite: {
        type: Number,
        required: true,
      },
      bugetVente: {
        type: Number,
        required: true,
      },

      default: [],
    },

    montantHT: {
      type: String,
      required: true,
    },
    montantNetHT: {
      type: String,
      required: true,
    },
    montantTVA: {
      type: String,
      required: true,
    },
    montantTTC: {
      type: String,
      required: true,
    },
    etat: {
      type: Object,

      _id: Number,
      code: String,
      label: String,
      style: String,

      default: {
        _id: 0,
        code: 'ET000',
        label: 'Nouveau',
        style: '#00FF00',
      },
    },

    client: {
      type: Object,

      default: null,

      _id: {
        type: Number,
        required: true,
      },
      intitule: {
        type: String,
        required: true,
      },
      phone: {
        type: Number,
        required: true,
      },
      identFiscale: {
        type: String,
        required: true,
      },
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('Document', documentSchema);
