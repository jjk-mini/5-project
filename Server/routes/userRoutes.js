const express = require("express");

const {
  getMyProfile,
  updateMyProfile,
  uploadProfileImage,
  changePassword,
} = require("../controllers/userController");

const upload = require("../middleware/upload");
console.log(upload)
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/profile",
  protect,
  getMyProfile
);

router.put(
  "/profile",
  protect,
  updateMyProfile
);

router.put(
  "/profile/image",
  protect,
  upload.single("profileImage"),
  uploadProfileImage
);

router.put(
  "/change-password",
  protect,
  changePassword
);

module.exports = router;