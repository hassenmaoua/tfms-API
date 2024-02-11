const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
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
      default: [],
    },

    montantHT: {
      type: Number,
    },

    montantTVA: {
      type: Number,
      default: 0,
    },

    TVA: {
      type: Number,
      default: 0,
    },
    timber: {
      type: Number,
      default: 0,
    },

    montantTTC: {
      type: Number,
    },
    etat: {
      type: Number,
      ref: 'State',
    },

    client: {
      type: Number,
      ref: 'Client',
    },

    docCreateur: {
      type: Number,
      default: null,
    },
  },
  {
    versionKey: false,
  }
);

// Pre-save middleware to generate _id based on document type
documentSchema.pre('save', async function (next) {
  try {
    // Get the current document type (BON or FAC)
    const docType = this._id.substring(0, 3);

    // Find the last document of the same type to get the latest count
    const lastDocument = await this.constructor.findOne(
      { _id: { $regex: `^${docType}-\\d{5}$` } },
      { _id: 1 },
      { sort: { _id: -1 } }
    );

    // Extract the count from the last document, or initialize it to 0 if no document exists
    let count = 0;
    if (lastDocument) {
      const lastId = parseInt(lastDocument._id.split('-')[1]);
      count = isNaN(lastId) ? 0 : lastId;
    }

    // Increment the count and pad it with zeros
    count++;
    const paddedCount = String(count).padStart(5, '0');

    // Set the _id field with the new value
    this._id = `${docType}-${paddedCount}`;

    // Continue saving the document
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('Document', documentSchema);
