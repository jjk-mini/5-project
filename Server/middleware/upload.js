const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
 
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "rooms",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    // Unique filename: fieldname + timestamp, Cloudinary handles the rest
    public_id: (req, file) =>
      `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1e9)}`,
  },
});
 
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};
 
const upload = multer({ storage, fileFilter });
 
module.exports = upload;