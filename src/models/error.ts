/**
 * Thrown when the Cin7 API responds with a non-2xx status. Carries the HTTP
 * status, status text, and the parsed response body (JSON when possible, raw
 * text otherwise, or `undefined` for empty bodies).
 */
class Cin7HTTPResponseError extends Error {
  readonly status: number;
  readonly statusText: string;
  readonly body: unknown;

  constructor(status: number, statusText: string, body?: unknown) {
    super(`HTTP Error Response: ${status} ${statusText}`);
    this.name = "Cin7HTTPResponseError";
    this.status = status;
    this.statusText = statusText;
    this.body = body;
  }
}

/**
 * Thrown for client-side errors that are not tied to a single HTTP response,
 * such as exhausting the retry budget or failing to parse a response body.
 */
class Cin7APIError extends Error {
  constructor(message: string) {
    super(`Cin7 API Error: ${message}`);
    this.name = "Cin7APIError";
  }
}

export { Cin7HTTPResponseError, Cin7APIError };
