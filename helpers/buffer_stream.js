const cloudinary = require("../services/cloudinary");

// Use a promise to handle the stream upload
const uploadFromBuffer = async (buffer, { name, timestamp }) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "cv",
        resource_type: "raw",
        public_id: `${name}-${timestamp}`,
      }, // Use "raw" for non-image files like PDFs
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );

    stream.end(buffer);
  });
};

module.exports = uploadFromBuffer;
