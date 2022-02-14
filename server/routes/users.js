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

  const user = new User({ name });
  await user.save();
  res.status(201).send(user);
});

router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).send("User not found.");

  res.status(204).send();
});

module.exports = router;
