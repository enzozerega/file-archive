const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find().sort("name");

  res.send(users);
});

router.post("/", async (req, res) => {
  const { name } = req.body;

  if (!name) return;

  try {
    const user = new User({ name });
    await user.save();

    res.status(201).send(user);
  } catch (e) {
    res.status(409).send(e);
  }
});

module.exports = router;
