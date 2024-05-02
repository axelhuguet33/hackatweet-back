const express = require("express");
const router = express.Router();
const ObjectId = require("mongoose").Types.ObjectId;
const Tweet = require("../models/Tweet");
const User = require("../models/User");

router.post("/", async (req, res) => {
  const user = await User.findOne({ token: req.body.token });
  const hashtags = [...req.body.content.matchAll(/#(\w+)/gm)].map(
    (data) => data[1]
  );
  const newTweet = await new Tweet({
    user: new ObjectId(user._id),
    content: req.body.content,
    hashtags,
  }).save();

  res.json({ result: true, newTweet });
});

router.get("/", async (req, res) => {
  const allTweets = await Tweet.find({}).populate("user");
  res.json({ result: true, allTweets });
});

router.delete("/:id", async (req, res) => {
  const deletion = await Tweet.findByIdAndDelete(req.params.id);
  res.json({ result: true, deletion });
});
module.exports = router;
