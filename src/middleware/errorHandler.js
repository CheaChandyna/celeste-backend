// Error Handler middleware
const errorHandling = (err, request, response, next) => {
  console.log(err.stack);
  response.status(500).json({
    status: 500,
    message: 'Something went wrong!',
    error: err.message,
  });
}

export default errorHandling;