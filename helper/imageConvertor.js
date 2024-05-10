const sharp = require("sharp");
const fs = require("fs");

exports.webConvertor = async (file, desPath, name, quality, alphaQuality) => {
  let path = await sharp(file)
    .toFormat("webp")
    .webp({ quality, alphaQuality, force: true })
    .toFile(desPath + name + ".webp", (err, sharp) => {
      if (err) {
        throw new Error(err);
      }
      fs.unlinkSync(file);
      photoPath = path;
    }).options.fileOut;
  return path;
};

exports.deleteFile = async (file) => {
  try {
    fs.stat(file, (error, stats) => {
      if (error) {
        throw new Error(error);
      } else {
        return unlink(file);
      }
    });
  } catch (error) {
    throw new Error(error);
  }
};
