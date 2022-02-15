const multer = require("multer");

const getSuffix = (fileType) => {
  if (fileType === "image/jpeg") return "jpeg";
  if (fileType === "application/pdf") return "pdf";
  if (fileType === "text/xml") return "xml";
};

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, callback) => {
    callback(null, `${req.body.name}.${getSuffix(file.mimetype)}`);
  },
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype === "image/jpeg") callback(null, true);
  else if (file.mimetype === "application/pdf") callback(null, true);
  else if (file.mimetype === "text/xml") callback(null, true);
  else {
    callback(null, false);
    throw new Error("Invalid file type");
  }
};

module.exports = multer({ storage, fileFilter });
