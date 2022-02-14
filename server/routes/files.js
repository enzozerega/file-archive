const express = require("express");
const File = require("../models/file");
const upload = require("../middleware/upload");
var path = require("path");
const fs = require("fs");

const router = express.Router();

router.get("/", async (req, res) => {
  let { page, sort, order } = req.query;
  if (!page) page = 1;
  if (!sort) sort = "date";
  if (!order) order = -1;
  else order = order === "desc" ? -1 : 1;

  const limit = 5;
  const skip = (page - 1) * limit;
  const collection = File.find();
  collection.count(async (err, count) => {
    if (err) console.log(err);
    else {
      const files = await File.find()
        .limit(limit)
        .skip(skip)
        .collation({ locale: "en" })
        .sort({ [sort]: order });
      const pages = Math.ceil(count / limit);
      res.send({ page, pages, files });
    }
  });

  //
});

router.get("/download/:filepath", function (req, res) {
  const { filepath } = req.params;
  const file = path.join(__dirname, "../uploads", filepath);
  res.download(file);
});

router.post("/", upload.single("file"), async (req, res) => {
  const {
    body: { name, description, uploadedBy, date },
    file: { path, mimetype: type },
  } = req;

  try {
    const file = new File({
      name,
      type,
      description,
      uploadedBy,
      date,
      path,
    });
    await file.save();
    res.status(201).send(file);
  } catch (e) {
    res.status(409).send(e);
  }
});

router.delete("/:id", async (req, res) => {
  const file = await File.findByIdAndDelete(req.params.id);
  if (!file) return res.status(404).send("File not found.");

  const filepath = path.join(
    __dirname,
    "../uploads",
    file.path.replace("uploads/", "")
  );
  try {
    fs.unlinkSync(filepath);
  } catch (err) {
    console.error(err);
  }

  res.status(204).send();
});

module.exports = router;
