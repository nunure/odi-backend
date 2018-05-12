// error handler
module.exports = () => (err, req, res, next) => {
  if (!err) {
    return next();
  }
  // render the error page
  const status = err.status || 500;
  const message = err.message || "Unexpected error";
  return res.status(status).json({
    status,
    message
  });
};
