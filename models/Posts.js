
var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  title: String,
  link: String,
  image_link: String,
  upvotes: {type: Number, default: 0},
  description: String,
  topics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  created_at: {
    type: Date,
    required: true,
    default: Date.now
  },
  is_approved: {
    type: Boolean,
    required: true,
    default: false
  },
  approved_at: Date
});

PostSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};

PostSchema.methods.approve = function(cb) {
  this.is_approved = true;
  this.save(cb);
}

mongoose.model('Post', PostSchema);
