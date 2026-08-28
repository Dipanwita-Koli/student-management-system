const errorMiddleware = (err, req, res, next) => {
  console.error("Error:", err.message);

  res.status(err.statusCode || 500).json({
    message: err.message || "Server error",
  });
};

const notFoundMiddleware = (req, res) => {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

module.exports = {
  errorMiddleware,
  notFoundMiddleware,
};