// Uploads an in-memory file buffer (from multer's memoryStorage) to
// Cloudinary and resolves with the upload result (secure_url etc).
const streamifier = require("streamifier");
const cloudinary = require("../config/cloudinary");

const uploadBufferToCloudinary = (buffer, folder = "luxurystay/rooms") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

module.exports = uploadBufferToCloudinary;
