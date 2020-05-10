// @ts-check

class AuthError extends Error {
  /**
   * @param {String} message
   * @param {Number} status
   * @param params
   */
  constructor(message, status = 401, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AuthError);
    }

    this.name = "AuthError";
    this.status = status;
    this.message = message;
  }
}

export { AuthError };
