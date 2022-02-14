const mongoose = require("mongoose");

const url = process.env.DB_URL;

if (!url) throw new Error("Missing db url");

const connect = async () => {
  await mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("Connected to MongoDB: " + url);
};

const close = () => mongoose.connection.close();

module.exports = { connect, close, url };
