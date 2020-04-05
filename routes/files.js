const express = require("express");
const router = express.Router();

// All the CRUD we get from this route
const { getFile, newFile, getFiles } = require("../controller/file");

router.get("/getFile/:id", getFile);
router.post("/newFile", newFile);
router.get("/getFiles", getFiles);

module.exports = router;
