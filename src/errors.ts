class AuthError extends Error {
  private status: number;

  constructor(message: string, status = 401, ...params: undefined[]) {
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
