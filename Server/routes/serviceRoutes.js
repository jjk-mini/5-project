const express = require("express");
const {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} = require("../controllers/serviceController");
const upload = require("../middleware/upload");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getServices);
router.get("/:id", getServiceById);

router.post("/", protect, authorizeRoles("admin", "manager"), upload.single("image"), createService);
router.put("/:id", protect, authorizeRoles("admin", "manager"), upload.single("image"), updateService);
router.delete("/:id", protect, authorizeRoles("admin", "manager"), deleteService);

module.exports = router;