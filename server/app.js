const express = require("express");
const cors = require("cors");
const fileRoutes = require("./routes/files");
const userRoutes = require("./routes/users");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/files", fileRoutes);
app.use("/api/users", userRoutes);

module.exports = app;
