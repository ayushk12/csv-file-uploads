const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

// loads the csv module
const csv = require("csv-parser");
const fs = require("fs");
const results = [];

fs.createReadStream("data.csv")
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", () => {
    console.log(results);
  });

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

//set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//uplaoding a file
app.get("/", (req, res) => {
  res.sendfile(__dirname + "/views/index.ejs");
});

const PORT = process.env.PORT || 8000;
// connect to server
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
