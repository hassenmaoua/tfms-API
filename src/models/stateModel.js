const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema(
  {
    _id: Number,

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

// stateSchema.pre('save', function (next) {
//   const doc = this;
//   // Generate auto-incrementing _id value
//   if (doc.isNew) {
//     State.findOne({}, {}, { sort: { _id: -1 } })
//       .then((lastState) => {
//         doc._id = lastState ? lastState._id + 1 : 1;
//         next();
//       })
//       .catch((error) => {
//         console.error('Error generating auto-incrementing _id:', error);
//         next(error);
//       });
//   } else {
//     next();
//   }
// });
const State = mongoose.model('State', stateSchema);

module.exports = State;
