const cloudinary = require("../config/cloudinary");

const MAX_SIZE = 10 * 1024 * 1024;

// Use a promise to handle the stream upload
const uploadFromBuffer = async (file) => {
  if (file.size > MAX_SIZE) {
    const err = new Error("Your file exceeds 10MB");
    err.statusCode = 401;
    throw err;
  }

  const originalName = req.file.originalname.split(".")[0]; // Extract the original filename without extension
  
  const timestamp = Date.now();

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "cv",
        resource_type: "raw",
        public_id: `${originalName}-${timestamp}`,
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

module.exports = uploadFromBuffer;
