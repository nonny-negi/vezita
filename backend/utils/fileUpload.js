const multer = require("multer");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
require("dotenv").config({ path: "backend/config/config.env" });

const imageS3 = new AWS.S3({
  accessKeyId: process.env.AWS_SECRET_KEY,
  secretAccessKey: process.env.AWS_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const storageAvatarS3 = multerS3({
  s3: imageS3,
  bucket: process.env.AWS_BUCKET,
  acl: "public-read",
  metadata(req, file, cb) {
    cb(null, {
      fieldName: file.fieldname,
    });
  },
  key(req, file, cb) {
    cb(
      null,
      `user/avatar` +
        file.fieldname +
        "-" +
        Date.now().toString() +
        "." +
        file.mimetype.split("/")[1]
    );
  },
});

const storageBannerS3 = multerS3({
  s3: imageS3,
  bucket: "<S3_BUCKET_NAME>",
  acl: "public-read",
  metadata(req, file, cb) {
    cb(null, {
      fieldName: file.fieldname,
    });
  },
  key(req, file, cb) {
    cb(
      null,
      `banner/` +
        file.fieldname +
        "-" +
        Date.now().toString() +
        "." +
        file.mimetype.split("/")[1]
    );
  },
});

//Upload Avatar
const uploadImage = multer({
  limits: { fileSize: 10 * 1024 * 1024 },
  storage: storageAvatarS3,
});

//Upload Banner
const uploadBannerImage = multer({
  limits: { fileSize: 10 * 1024 * 1024 },
  storage: storageBannerS3,
});

module.exports = {
  uploadImage,
  uploadBannerImage,
};
