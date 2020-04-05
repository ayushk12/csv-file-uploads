const express = require("express");
const router = express.Router();
const fileRouter = require("./files");

// main route file
router.use("/file", fileRouter);

module.exports = router;
