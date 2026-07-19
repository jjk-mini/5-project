const asyncHandler = require("express-async-handler");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");
const Service = require("../models/Service");

// ── HELPER: Upload image buffer to Cloudinary ─────────────────
const uploadToCloudinary = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// @desc    List services — supports ?category=, ?search=, ?curated=true
// @route   GET /api/services
// @access  Public
const getServices = asyncHandler(async (req, res) => {
  const filter = {};

  if (req.query.category && req.query.category !== "All Services") {
    filter.category = req.query.category;
  }

  if (req.query.curated === "true") {
    filter.curated = true;
  }

  if (req.query.search) {
    const term = req.query.search.trim();
    if (term) {
      filter.$or = [
        { name: { $regex: term, $options: "i" } },
        { description: { $regex: term, $options: "i" } },
      ];
    }
  }

  const services = await Service.find(filter).sort({ createdAt: -1 });
  res.status(200).json(services);
});

// @desc    Get a single service
// @route   GET /api/services/:id
// @access  Public
const getServiceById = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) {
    res.status(404);
    throw new Error("Service not found");
  }
  res.status(200).json(service);
});

// @desc    Create a service
// @route   POST /api/services
// @access  Private (admin/manager)
const createService = asyncHandler(async (req, res) => {
  const { name, description, category, price, rating, eta, status, curated } = req.body;

  if (!name || !description || !category || price === undefined) {
    res.status(400);
    throw new Error("Please provide name, description, category, and price");
  }

  // Upload image to Cloudinary if file is provided
  let imageUrl = "";
  if (req.file) {
    imageUrl = await uploadToCloudinary(req.file.buffer, "luxurystay/services");
  }

  const service = await Service.create({
    name,
    description,
    category,
    price,
    rating,
    eta,
    status,
    curated,
    image: imageUrl,
  });

  res.status(201).json(service);
});

// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Private (admin/manager)
const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) {
    res.status(404);
    throw new Error("Service not found");
  }

  const { name, description, category, price, rating, eta, status, curated } = req.body;

  service.name        = name        ?? service.name;
  service.description = description ?? service.description;
  service.category    = category    ?? service.category;
  service.price       = price       ?? service.price;
  service.rating      = rating      ?? service.rating;
  service.eta         = eta         ?? service.eta;
  service.status      = status      ?? service.status;
  service.curated     = curated     ?? service.curated;

  // Upload new image to Cloudinary if provided
  if (req.file) {
    service.image = await uploadToCloudinary(req.file.buffer, "luxurystay/services");
  }

  const updated = await service.save();
  res.status(200).json(updated);
});

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Private (admin/manager)
const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) {
    res.status(404);
    throw new Error("Service not found");
  }
  await service.deleteOne();
  res.status(200).json({ message: "Service deleted successfully" });
});

module.exports = { getServices, getServiceById, createService, updateService, deleteService };