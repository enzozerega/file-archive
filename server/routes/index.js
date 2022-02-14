const express = require("express");
const path = require("path");
const router = express.Router();

router.use(express.static("../client/build"));

router.get("/", (req, res) => {
  // Serves the compiled react application
  res.sendFile(path.resolve(__dirname, "../build", "index.html"));
});

module.exports = router;
