const multer = require("multer");
const path = require("path");

exports.uploadImage = (req, res, next) => {
  try {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, __dirname + "/../upload/images");
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
      },
    });
    const fileFilter = (req, file, cb) => {
      if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
      ) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    };
    const upload = multer({ storage, fileFilter });
    upload.fields([
      {
        name: "profile",
        maxCount: 1,
      },
      {
        name: "images",
        maxCount: 5,
      },
    ])(
      // upload.single('profile')
      req,
      res,
      function (err) {
        if (err) {
          next(err);
        }
        next();
      }
    );
  } catch (error) {
    res.status(500);
    return error;
  }
};
