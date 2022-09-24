const mongoose = require('mongoose');

const produitSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
      required: true,
    },
    intitule: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: 'Aucun Descriptions',
    },
    quantite: {
      type: Number,
      default: 1,
    },
    bugetConsomme: {
      type: Number,
      default: 0,
    },
    bugetVente: {
      type: Number,
      default: 0,
    },
    dateCreation: {
      type: String,
      default: new Date(Date.now())
        .toLocaleDateString()
        .replace('/', '-')
        .replace('/', '-'),
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
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('Produit', produitSchema);
