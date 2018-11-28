module.exports = errorHandler;

function errorHandler(err, req, res, next) {
  if (typeof err === 'string') {
    // custom error
    return res.status(400).json({ error: err });
  } else if (err.name === 'ValidationError') {
    // mongoose error
    return res.status(400).json({ error: err.message });
  } else if (err.name === 'UnauthorizedError') {
    // jwt error
    return res.status(401).json({ error: 'Invalid token' });
  }

  return res.status(500).json({ error: err.message });
}
