/**
 * Domain-level errors for backend data functions. Callers building a
 * Server Action/Route Handler on top of these can distinguish "bad input"
 * from "record not found" from a genuinely unexpected failure by checking
 * `instanceof`, instead of parsing error messages.
 */

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}
