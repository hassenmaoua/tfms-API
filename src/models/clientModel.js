const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema(
  {
    _id: Number,

    intitule: {
      type: String,
      default: '',
    },
    tax: {
      type: String,
      unique: true,
      default: '',
    },
    phone: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    address: {
      type: String,
      default: '',
    },

    avatar: {
      type: String,
      default: '/uploads/defaultAvatar.jpg',
    },

    nature: {
      type: String,
      default: '',
    },

    createdAt: {
      type: Date,
      default: Date.now(),
    },

    createdBy: {
      type: Number,
      default: null,
    },

    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
  }
);

clientSchema.pre('save', function (next) {
  const doc = this;
  // Generate auto-incrementing _id value
  if (doc.isNew) {
    Client.findOne({}, {}, { sort: { _id: -1 } })
      .then((lastClient) => {
        doc._id = lastClient ? lastClient._id + 1 : 1;
        next();
      })
      .catch((error) => {
        console.error('Error generating auto-incrementing _id:', error);
        next(error);
      });
  } else {
    next();
  }
});
const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
