// controllers/userController.js

const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

// ==========================================
// GET MY PROFILE
// GET /api/users/profile
// ==========================================

const getMyProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// ==========================================
// UPDATE MY PROFILE
// PUT /api/users/profile
// ==========================================

const updateMyProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const {
    name,
    email,
    phone,
    dateOfBirth,
    gender,
    country,
    preferredRoomType,
    preferredLanguage,
    emailNotifications,
    smsNotifications,
    marketingEmails,
  } = req.body;

  if (name !== undefined) {
    user.name = name;
  }

  if (email !== undefined) {
    user.email = email.toLowerCase().trim();
  }

  if (phone !== undefined) {
    user.phone = phone;
  }

  if (dateOfBirth !== undefined) {
    user.dateOfBirth = dateOfBirth;
  }

  if (gender !== undefined) {
    user.gender = gender;
  }

  if (country !== undefined) {
    user.country = country;
  }

  if (preferredRoomType !== undefined) {
    user.preferredRoomType = preferredRoomType;
  }

  if (preferredLanguage !== undefined) {
    user.preferredLanguage = preferredLanguage;
  }

  if (emailNotifications !== undefined) {
    user.emailNotifications = emailNotifications;
  }

  if (smsNotifications !== undefined) {
    user.smsNotifications = smsNotifications;
  }

  if (marketingEmails !== undefined) {
    user.marketingEmails = marketingEmails;
  }

  const updatedUser = await user.save();

  const safeUser = updatedUser.toObject();
  delete safeUser.password;

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user: safeUser,
  });
});

// ==========================================
// UPLOAD PROFILE IMAGE
// PUT /api/users/profile/image
// ==========================================

const uploadProfileImage = asyncHandler(async (req, res) => {
  console.log("========== PROFILE IMAGE UPLOAD ==========");

  console.log("FILE RECEIVED:", {
    fieldname: req.file?.fieldname,
    originalname: req.file?.originalname,
    mimetype: req.file?.mimetype,
    size: req.file?.size,
  });

  if (!req.file) {
    res.status(400);
    throw new Error("No image file received");
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  try {
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "luxurystay/profile-images",
          resource_type: "image",
        },

        (error, result) => {
          if (error) {
            console.error("========== CLOUDINARY UPLOAD ERROR ==========");

            console.error("Message:", error.message);
            console.error("HTTP Code:", error.http_code);
            console.error("Name:", error.name);
            console.error("Full Error:", error);

            reject(error);
            return;
          }

          console.log("CLOUDINARY UPLOAD SUCCESS:", {
            public_id: result.public_id,
            secure_url: result.secure_url,
          });

          resolve(result);
        }
      );

      streamifier
        .createReadStream(req.file.buffer)
        .pipe(uploadStream);
    });

    user.profileImage = uploadResult.secure_url;

    const updatedUser = await user.save();

    const safeUser = updatedUser.toObject();
    delete safeUser.password;

    console.log("PROFILE IMAGE SAVED SUCCESSFULLY");

    res.status(200).json({
      success: true,
      message: "Profile image uploaded successfully",
      profileImage: uploadResult.secure_url,
      user: safeUser,
    });
  } catch (error) {
    console.error("FINAL IMAGE UPLOAD ERROR:", error);

    res.status(error.http_code || 500);

    throw new Error(
      error.message || "Profile image upload failed"
    );
  }
});

// ==========================================
// CHANGE PASSWORD
// PUT /api/users/change-password
// ==========================================

const changePassword = asyncHandler(async (req, res) => {
  const {
    currentPassword,
    newPassword,
    confirmPassword,
  } = req.body;

  if (
    !currentPassword ||
    !newPassword ||
    !confirmPassword
  ) {
    res.status(400);
    throw new Error("All password fields are required");
  }

  if (newPassword !== confirmPassword) {
    res.status(400);
    throw new Error("New passwords do not match");
  }

  if (newPassword.length < 8) {
    res.status(400);
    throw new Error(
      "Password must be at least 8 characters"
    );
  }

  const user = await User.findById(req.user._id).select(
    "+password"
  );

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const isMatch = await user.matchPassword(
    currentPassword
  );

  if (!isMatch) {
    res.status(401);
    throw new Error(
      "Current password is incorrect"
    );
  }

  user.password = newPassword;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});

// ==========================================
// EXPORT CONTROLLERS
// ==========================================

module.exports = {
  getMyProfile,
  updateMyProfile,
  uploadProfileImage,
  changePassword,
};