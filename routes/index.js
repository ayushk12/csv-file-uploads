const express = require("express");
const router = express.Router();
const fileRouter = require("./files");

router.use("/file", fileRouter);

module.exports = router;
