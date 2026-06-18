export const notFound = (req, _res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

export const errorHandler = (error, _req, res, _next) => {
  const statusCode = error.statusCode || error.status || 500;

  if (error.code === 11000) {
    res.status(409).json({
      message: 'An account with this email already exists'
    });
    return;
  }

  if (error.name === 'ValidationError') {
    res.status(400).json({
      message: Object.values(error.errors)
        .map((value) => value.message)
        .join(', ')
    });
    return;
  }

  res.status(statusCode).json({
    message: error.message || 'Something went wrong',
    stack: process.env.NODE_ENV === 'production' ? undefined : error.stack
  });
};
