export default class ApiError extends Error {
  constructor(statusCode, description, code) {
    super(description);
    this.statusCode = statusCode;
    this.body = {
      error: {
        description,
        code: code || statusCode
      }
    };
  }
}
