const cloudinary = require("../config/cloudinary");

// Use a promise to handle the stream upload
const uploadCV = async (file) => {
  const timestamp = Date.now();
  const filename = file.originalname.split(".")[0];

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "cv",
        resource_type: "raw",
        public_id: `${filename}-${timestamp}`,
      }, // Use "raw" for non-image files like PDFs
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );

    stream.end(file.buffer);
  });
};

module.exports = uploadCV;
