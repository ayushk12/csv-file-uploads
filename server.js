const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

const route = require("./routes");
const errorHandler = require("./middleware/errorHandler");
const fileUploads = require("express-fileupload");

// connect to database
mongoose
  .connect("mongodb://localhost/store")
  .then(() => console.log("connected to db"))
  .catch((error) => console.error("error", error));

app.use(fileUploads());

app.use(express.static(path.join(__dirname, "uploads")));
app.use((req, res, next) => {
  console.log("files", req.files);
  next();
});

app.use("/", route);
app.use(errorHandler);
// uplaoding a file
// app.get("/", (req, res) => {
//   res.sendfile(__dirname + "/index.html");
// });

const PORT = process.env.PORT || 8000;
// connect to server
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
