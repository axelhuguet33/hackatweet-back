const express = require("express");
const uid2 = require("uid2");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/User");

router.get("/:token", async (req, res) => {
  try {
    const user = await User.findOne({ token: req.params.token });
    res.json({ result: true, user });
  } catch (err) {
    res.json({ result: false, error: err.message });
  }
});

router.post("/signup", async (req, res) => {
  try {
    if (req.body.password.length <= 7)
      throw new Error("Password must contain at least 8 characters");
    const newUser = await new User({
      firstName: req.body.firstName,
      username: req.body.username,
      imageUrl: `https://robohash.org/${req.body.username}?set=set4`,
      password: bcrypt.hashSync(req.body.password, 10),
      token: uid2(32),
    }).save();
    res.json({ result: true, token: newUser.token });
  } catch (err) {
    res.json({ result: false, error: err.message });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) throw new Error("User not found");
    if (!bcrypt.compareSync(req.body.password, user.password))
      throw new Error("Password is incorrect");
    res.json({ result: true, token: user.token });
  } catch (err) {
    res.json({ result: false, error: err.message });
  }
});

module.exports = router;
