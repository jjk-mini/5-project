const errorMiddleware = (err, req, res, next) => {
  console.error("========== ERROR ==========");
  console.error(err);
  console.error("MESSAGE:", err.message);
  console.error("STACK:", err.stack);
  console.error("===========================");

  res.status(500).json({
    message: err.message || "Server Error",
  });
};

module.exports = errorMiddleware;