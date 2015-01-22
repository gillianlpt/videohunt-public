var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  name: String,
  twitter: {
    id: Number,
    token: String,
    username: String,
    displayName: String,
    avatarLink: String
  },
  // posts: [{
  //   type: mongoose.Schema.Types.ObjectId, ref: 'Post'
  // }],
  created_at: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);

// var User = mongoose.model('User', userSchema);
