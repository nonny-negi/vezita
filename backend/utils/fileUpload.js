const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname.split("backend")[0] + "/backend/public/uploads");
  },
  filename: (req, file, cb) => {
    console.log("uploading file +++++++++++++++++++++++++++++++");
    const newFileName =
      file.originalname.trim() + Date.now() + path.extname(file.originalname);
    cb(null, newFileName);
  },
});

exports.upload = multer({ storage: storage });

exports.singleFileHandler = (file, req) => {
  const url = `${req.protocol}://${req.get(
    "host"
  )}/directory/images`;

  let imagesLink = {
    public_id: file,
    url: `${url}/${file}`,
  };

  return imagesLink;
};

exports.multipleImageHandler = async (file, req) => {
  const url = `${req.protocol}://${req.get(
    "host"
  )}/directory/images`;

  const imagesLink = [];
  // console.log(file);

  for (let i = 0; i < file.length; i++) {
    imagesLink.push({
      public_id: file[i].filename,
      url: `${url}/${file[i].filename}`,
    });
  }

  return imagesLink;
};
