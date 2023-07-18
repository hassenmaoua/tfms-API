const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    _id: Number,

    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
      required: false,
      default: 'defaultAvatar.jpg',
    },
  },
  {
    versionKey: false,
  }
);

userSchema.pre('save', function (next) {
  const doc = this;
  // Generate auto-incrementing _id value
  if (doc.isNew) {
    User.findOne({}, {}, { sort: { _id: -1 } })
      .then((lastUser) => {
        doc._id = lastUser ? lastUser._id + 1 : 1;
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
const User = mongoose.model('User', userSchema);

module.exports = User;
