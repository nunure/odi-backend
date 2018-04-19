// catch 404
module.exports = () => (req, res) => {
  const status = 404;
  const message = `Cannot ${req.method} ${req.url}`;
  return res.status(status).json({
    status,
    message,
  });
};
