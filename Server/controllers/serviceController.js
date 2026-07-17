const asyncHandler = require("express-async-handler");
const Service = require("../models/Service");

// @desc    List services — supports ?category=, ?search=, ?curated=true
// @route   GET /api/services
// @access  Public (guests browsing while logged in, or public menu preview)
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

  // multer-storage-cloudinary attaches the uploaded file's URL to req.file.path
  const image = req.file ? req.file.path : "";

  const service = await Service.create({
    name, description, category, price, rating, eta, status, curated, image,
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

  service.name = name ?? service.name;
  service.description = description ?? service.description;
  service.category = category ?? service.category;
  service.price = price ?? service.price;
  service.rating = rating ?? service.rating;
  service.eta = eta ?? service.eta;
  service.status = status ?? service.status;
  service.curated = curated ?? service.curated;

  if (req.file) {
    service.image = req.file.path;
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