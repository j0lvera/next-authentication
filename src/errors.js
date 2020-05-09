class AuthError extends Error {
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
