const asyncHandler = require("express-async-handler");
const Order = require("../models/Orders");
const Service = require("../models/Service");
const { notifyRole, notifyUser } = require("../utils/notify");

const { SERVICE_CHARGE_RATE, TAX_RATE } = Order.RATES;

// @desc    Place an order from the cart
// @route   POST /api/orders
// @access  Private (guest)
// Body: { items: [{ serviceId, quantity }], specialInstructions }
//
// Prices are NEVER trusted from the client — every item's current price is
// looked up from the database here, so a tampered request can't change totals.
const createOrder = asyncHandler(async (req, res) => {
  const { items, specialInstructions } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    res.status(400);
    throw new Error("Your cart is empty");
  }

  const serviceIds = items.map((i) => i.serviceId);
  const services = await Service.find({ _id: { $in: serviceIds } });

  const orderItems = items.map((cartItem) => {
    const service = services.find((s) => s._id.toString() === cartItem.serviceId);
    if (!service) {
      res.status(404);
      throw new Error(`Service ${cartItem.serviceId} not found`);
    }
    if (service.status !== "available") {
      res.status(409);
      throw new Error(`${service.name} is currently unavailable`);
    }
    const quantity = Math.max(1, Number(cartItem.quantity) || 1);
    return {
      service: service._id,
      name: service.name,
      price: service.price,
      quantity,
    };
  });

  const subtotal = orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const serviceCharge = Math.round(subtotal * SERVICE_CHARGE_RATE * 100) / 100;
  const taxes = Math.round(subtotal * TAX_RATE * 100) / 100;
  const total = Math.round((subtotal + serviceCharge + taxes) * 100) / 100;

  const order = await Order.create({
    guest: req.user._id,
    items: orderItems,
    specialInstructions: specialInstructions || "",
    subtotal,
    serviceCharge,
    taxes,
    total,
  });

  notifyRole({
    role: "receptionist",
    title: "New service order",
    detail: `${orderItems.length} item${orderItems.length !== 1 ? "s" : ""} \u00b7 $${total.toFixed(2)}`,
    type: "order",
    link: "/admin/services",
  });

  res.status(201).json(order);
});

// @desc    Get the logged-in guest's own orders
// @route   GET /api/orders/mine
// @access  Private (guest)
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ guest: req.user._id }).sort({ createdAt: -1 });
  res.status(200).json(orders);
});

// @desc    Get all orders (staff view)
// @route   GET /api/orders
// @access  Private (admin/manager/receptionist)
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate("guest", "name email").sort({ createdAt: -1 });
  res.status(200).json(orders);
});

// @desc    Update an order's status
// @route   PATCH /api/orders/:id/status
// @access  Private (staff)
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const allowed = ["pending", "confirmed", "delivered", "cancelled"];
  if (!allowed.includes(status)) {
    res.status(400);
    throw new Error(`Status must be one of: ${allowed.join(", ")}`);
  }

  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.status = status;
  const updated = await order.save();

  const guestMessages = {
    confirmed: "Your order has been confirmed.",
    delivered: "Your order has been delivered. Enjoy!",
    cancelled: "Your order was cancelled.",
  };
  if (guestMessages[status]) {
    notifyUser({
      userId: order.guest,
      title: guestMessages[status],
      detail: `Order total $${order.total.toFixed(2)}`,
      type: "order",
      link: "/guest/services",
    });
  }

  res.status(200).json(updated);
});

module.exports = { createOrder, getMyOrders, getAllOrders, updateOrderStatus };