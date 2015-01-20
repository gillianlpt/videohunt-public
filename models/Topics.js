var mongoose = require('mongoose');

var topicSchema = new mongoose.Schema({
  freebase_mid: String,
  freebase_id: {type:String, index:true, unique:true, sparse:true, },
  topicName: String,
  notable: {
    name: String,
    id: String,
  },
  lang: String,
  score: Number,
  commentCount: Number,
  subscriberCount: Number,
  description: String,
  image_url: String,
  subscribers: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  }],
  created_at: {
    type: Date,
    required: true,
    default: Date.now
  }
});
var Topic = mongoose.model('Topic', topicSchema);
