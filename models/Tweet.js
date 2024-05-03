const mongoose = require("mongoose");

const tweetSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  content: {
    type: String,
    required: true,
  },
  hashtags: {
    type: [String],
  },
  likes: {
    type: [String],
    default: [],
  },
});

const Tweet = mongoose.model("tweets", tweetSchema);

module.exports = Tweet;
