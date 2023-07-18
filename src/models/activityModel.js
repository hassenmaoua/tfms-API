const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
  {
    _id: Number,

    intitule: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: 'Aucune description',
    },

    type: {
      type: String,
      required: true,
    },
    quantite: {
      type: Number,
      default: 1,
    },
    consumeBudget: {
      type: Number,
      default: 0,
    },
    saleBudget: {
      type: Number,
      default: 0,
    },

    estimate: {
      type: Object,
      time: Number,
      unit: String,

      default: {
        time: 1,
        unit: '',
      },
    },
    state: {
      type: Number,
      ref: 'State',
    },

    client: {
      type: Number,
      ref: 'Client',
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    createdBy: {
      type: Number,
      default: null,
    },
  },
  {
    versionKey: false,
  }
);

activitySchema.pre('save', function (next) {
  const doc = this;
  // Generate auto-incrementing _id value
  if (doc.isNew) {
    Activity.findOne({}, {}, { sort: { _id: -1 } })
      .then((lastActivity) => {
        doc._id = lastActivity ? lastActivity._id + 1 : 1;
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
const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
