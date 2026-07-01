import { RequestMethod } from "./models/request";
import { Cin7HTTPResponseError, Cin7APIError } from "./models/error";
import type { Cin7ListParams } from "./models/list-params";

/**
 * HTTP client for the Cin7 Omni API. Handles Basic authentication, automatic
 * retries (429 + 5xx, honoring `Retry-After`), and page-based pagination over
 * the bare JSON arrays that Cin7 list endpoints return.
 */
class Cin7Client {
  private readonly _baseHeaders: Record<string, string>;
  private readonly _maxRetries = 3;
  /** Fallback retry delay (ms) when no `Retry-After` header is present. */
  private readonly _retryDelay = 1000;
  /** Default page size used by {@link paginate} when the caller omits `rows`. */
  static readonly DEFAULT_ROWS = 250;

  /**
   * @param username Cin7 API connection username.
   * @param apiKey Cin7 API connection key. Combined with the username to form
   *   the HTTP Basic `Authorization` header.
   */
  constructor(username: string, apiKey: string) {
    const token = Buffer.from(`${username}:${apiKey}`).toString("base64");
    this._baseHeaders = {
      Authorization: `Basic ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json"
    };
  }

  private async _delay(ms: number): Promise<void> {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
  }

  private _constructURL(
    url: string,
    query?: Record<string, string>
  ): string {
    const urlWithParams = new URL(url);
    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        urlWithParams.searchParams.append(key, value);
      });
    }
    return urlWithParams.toString();
  }

  /** Serializes list params to string query values, dropping `undefined`. */
  private _serializeListParams(
    params?: Cin7ListParams
  ): Record<string, string> {
    const query: Record<string, string> = {};
    if (!params) {
      return query;
    }
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        query[key] = String(value);
      }
    }
    return query;
  }

  private _serializeBody(method: RequestMethod, json?: unknown): string | null {
    return method !== RequestMethod.GET && json !== undefined
      ? JSON.stringify(json)
      : null;
  }

  private async _request(
    method: RequestMethod,
    url: string,
    query?: Record<string, string>,
    json?: unknown
  ): Promise<Response> {
    const urlWithParams = this._constructURL(url, query);
    const headers = { ...this._baseHeaders };
    const body = this._serializeBody(method, json);

    let attempt = 0;
    for (;;) {
      const response = await fetch(urlWithParams, { method, headers, body });

      if (this._shouldRetry(response)) {
        if (attempt >= this._maxRetries) {
          throw new Cin7APIError("Max retries reached");
        }
        attempt++;
        await this._delay(this._retryAfterMs(response));
        continue;
      }

      await this._handleErrors(response);
      return response;
    }
  }

  private _shouldRetry(response: Response): boolean {
    return response.status === 429 || response.status >= 500;
  }

  private _retryAfterMs(response: Response): number {
    const header = response.headers.get("retry-after");
    if (header) {
      const seconds = Number(header);
      if (!Number.isNaN(seconds) && seconds >= 0) {
        return seconds * 1000;
      }
    }
    return this._retryDelay;
  }

  private async _handleErrors(response: Response): Promise<void> {
    if (!response.ok) {
      const body = await this._safeParseBody(response);
      throw new Cin7HTTPResponseError(
        response.status,
        response.statusText,
        body
      );
    }
  }

  private async _safeParseBody(response: Response): Promise<unknown> {
    try {
      const text = await response.text();
      if (!text) {
        return undefined;
      }
      try {
        return JSON.parse(text) as unknown;
      } catch {
        return text;
      }
    } catch {
      return undefined;
    }
  }

  /**
   * Reads and JSON-parses a successful response body, returning `undefined`
   * for `204`/empty responses. Throws {@link Cin7APIError} if a non-empty body
   * is not valid JSON.
   */
  async _extractData<T>(response: Response): Promise<T> {
    // Some endpoints (deletes, some actions) reply 204 / empty body.
    if (response.status === 204) {
      return undefined as T;
    }
    const text = await response.text();
    if (!text) {
      return undefined as T;
    }
    try {
      return JSON.parse(text) as T;
    } catch {
      throw new Cin7APIError(
        `Failed to parse response body as JSON (status ${response.status})`
      );
    }
  }

  /**
   * Walks page-based pagination until a page returns fewer than `rows`
   * records, concatenating every bare-array page into a single result. The
   * caller's `fields`/`where`/`order` filters are sent on every page.
   */
  async paginate<T>(url: string, params?: Cin7ListParams): Promise<T[]> {
    const rows = params?.rows ?? Cin7Client.DEFAULT_ROWS;
    const data: T[] = [];
    let page = params?.page ?? 1;

    for (;;) {
      const query = this._serializeListParams({ ...params, page, rows });
      const response = await this._request(RequestMethod.GET, url, query);
      const batch = (await this._extractData<T[]>(response)) ?? [];
      data.push(...batch);

      // A short (or empty) page means there are no more records to fetch.
      if (batch.length < rows) {
        break;
      }
      page++;
    }
    return data;
  }

  /** Issues a `GET` and returns the parsed response body. */
  async get<T>(url: string, params?: Cin7ListParams): Promise<T> {
    const response = await this._request(
      RequestMethod.GET,
      url,
      this._serializeListParams(params)
    );
    return this._extractData<T>(response);
  }

  /** Issues a `POST` with a JSON body and returns the parsed response body. */
  async post<T>(url: string, json?: unknown): Promise<T> {
    const response = await this._request(
      RequestMethod.POST,
      url,
      undefined,
      json
    );
    return this._extractData<T>(response);
  }

  /** Issues a `PUT` with a JSON body and returns the parsed response body. */
  async put<T>(url: string, json?: unknown): Promise<T> {
    const response = await this._request(
      RequestMethod.PUT,
      url,
      undefined,
      json
    );
    return this._extractData<T>(response);
  }

  /** Issues a `DELETE` (optionally with a JSON body) and returns the parsed body. */
  async delete<T>(url: string, json?: unknown): Promise<T> {
    const response = await this._request(
      RequestMethod.DELETE,
      url,
      undefined,
      json
    );
    return this._extractData<T>(response);
  }
}

export default Cin7Client;
