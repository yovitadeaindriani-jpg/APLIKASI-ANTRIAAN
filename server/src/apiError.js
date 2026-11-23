export class ApiError extends Error {
  constructor(statusCode, code, message) {
    super(message);
    /* Tanpa baris ini, seluruh galat bernama "Error" di log. */
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.code = code;
  }
}
