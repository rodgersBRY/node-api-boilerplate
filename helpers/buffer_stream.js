const cloudinary = require("../config/cloudinary");

// Use a promise to handle the stream upload
const uploadFile = async (file, folder, resourceType) => {
  const timestamp = Date.now();
  const filename = file.originalname.split(".")[0];

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: resourceType,
        public_id: `${filename}-${timestamp}`,
      }, // Use "raw" for non-image files like PDFs and "image" for image files
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

module.exports = { uploadFile };
