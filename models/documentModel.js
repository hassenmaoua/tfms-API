const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
      required: true,
    },

    intitule: {
      type: String,
      default: '',
    },

    dopiece: {
      type: Number,
      required: true,
    },

    dateDoc: {
      type: String,
      default: new Date(Date.now())
        .toLocaleDateString()
        .replace('/', '-')
        .replace('/', '-'),
    },

    articles: {
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
      type: Number,
    },
    montantTVA: {
      type: Number,
      default: 0,
    },
    remise: {
      type: Number,
      default: 0,
    },
    montantTTC: {
      type: Number,
    },
    etat: {
      type: Object,

      _id: Number,
      code: String,
      label: String,
      style: String,

      default: {
        _id: 10,
        code: 'ETD',
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
      identFiscale: {
        type: String,
        required: true,
      },
      adresse: {
        type: String,
        required: true,
      },
    },

    docCreateur: {
      type: Object,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('Document', documentSchema);
