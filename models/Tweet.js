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
  likeCounter: {
    type: Number,
    default: 0,
  },
});

const Tweet = mongoose.model("tweets", tweetSchema);

module.exports = Tweet;
