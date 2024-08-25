
class CustomError extends Error {
  statusCode: any;
}

export const errorHandler = (statusCode: any, message: any) => {
  const error = new CustomError(message);
  error.statusCode = statusCode;
  error.message = message;
  return error;
}
