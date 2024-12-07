const cloudinary = require("cloudinary").v2;
const {
  CLOUDINARY_NAME,
  CLOUDINARY_SECRET_KEY,
  CLOUDINARY_API_KEY,
} = require("../config/env");

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_SECRET_KEY,
});

module.exports = cloudinary;
