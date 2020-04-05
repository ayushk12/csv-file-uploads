const File = require("../models/CSV");
const asyncHandler = require("../middleware/asyncHnadler");
const ErrorResponse = require("../utils/errorResponse");

// @desc        get a list of all uploads files
// @route       GET /files/getFiles

exports.getFiles = asyncHandler(async (req, res, next) => {
  const files = await File.find({});
  return res.status(200).json({
    success: true,
    files,
  });
});

// @desc        get to uplaod a file
// @route       POST /file/newFile
exports.newFile = asyncHandler(async (req, res, next) => {
  if (req.files) {
    const csv = req.files.file;

    // checking the type of file
    if (!csv.mimetype.startsWith("text/csv")) {
      return next(new ErrorResponse("please uplaod an csv file", 400));
    }

    //   path uploads

    csv.mv(`./uploads/${csv.name}`, async (err) => {
      if (err) {
        console.err(err);
      }
    });

    const file = await File.create({
      url: csv.name,
    });

    return res.status(201).json({
      file,
      success: true,
    });
  }
});

// @desc        display the content of the file
// @route       GET /files/getFile/:id
exports.getFile = asyncHandler(async (req, res, next) => {
  const file = await File.findById(req.params.id);

  if (!file) {
    return next(new ErrorResponse("No content of file", 404));
  }

  return res.status(200).json({
    success: true,
    file,
  });
});
