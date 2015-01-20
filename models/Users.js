var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  topics: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Topic'
  }],
  created_at: {
    type: Date,
    required: true,
    default: Date.now
  }
});

var User = mongoose.model('User', userSchema);
