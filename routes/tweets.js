const express = require("express");
const router = express.Router();
const ObjectId = require("mongoose").Types.ObjectId;
const Tweet = require("../models/Tweet");
const User = require("../models/User");

router.get("/", async (req, res) => {
  const allTweets = await Tweet.find({}).populate("user");
  res.json({ result: true, allTweets });
});

router.get("/hashtags", async (req, res) => {
  const allTweets = await Tweet.find({}).populate("user");
  const allHashtags = allTweets.map((tweet) => tweet.hashtags).flat();
  const hashtags = allHashtags.reduce((acc, val) => {
    val in acc ? acc[val]++ : (acc[val] = 1);
    return acc;
  }, {});
  res.json({ result: true, hashtags });
});

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

router.post("/likes", async (req, res) => {
  const toUpdate = await Tweet.findOne({ _id: new ObjectId(req.body._id) });
  if (toUpdate.likes.includes(req.body.token)) {
    await Tweet.updateOne(
      { _id: new ObjectId(req.body._id) },
      { likes: toUpdate.likes.filter((token) => token !== req.body.token) }
    );
  } else {
    await Tweet.updateOne(
      { _id: new ObjectId(req.body._id) },
      { likes: [...toUpdate.likes, req.body.token] }
    );
  }
  res.json({ result: true });
});

router.delete("/:id", async (req, res) => {
  const deletion = await Tweet.findByIdAndDelete(req.params.id);
  res.json({ result: true, deletion });
});
module.exports = router;
