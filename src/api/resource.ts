import type Cin7Client from "../client";
import type { Cin7ListParams } from "../models/list-params";

/**
 * Base class for Cin7 API resources. Subclasses set {@link resource} (the path
 * segment, e.g. `"SalesOrders"`) and optionally override {@link apiVersion};
 * the {@link url} getter builds the full endpoint URL. The protected `_get`,
 * `_post`, `_put`, `_delete`, and `_paginate` helpers delegate to the shared
 * client and are generic so concrete resources can pin their model types.
 */
abstract class Cin7Resource {
  protected readonly baseUrl: string = "https://api.cin7.com/api";
  protected abstract readonly resource: string;
  protected readonly apiVersion: "v1" | "v2" = "v1";
  protected client: Cin7Client;

  protected constructor(client: Cin7Client) {
    this.client = client;
  }

  /** The fully-qualified endpoint URL, e.g. `https://api.cin7.com/api/v1/SalesOrders`. */
  protected get url(): string {
    return `${this.baseUrl}/${this.apiVersion}/${this.resource}`;
  }

  /** Delegates a typed `GET` to the shared client. */
  protected _get<T>(url: string, params?: Cin7ListParams): Promise<T> {
    return this.client.get<T>(url, params);
  }

  /** Delegates a typed `POST` to the shared client. */
  protected _post<T>(url: string, body?: unknown): Promise<T> {
    return this.client.post<T>(url, body);
  }

  /** Delegates a typed `PUT` to the shared client. */
  protected _put<T>(url: string, body?: unknown): Promise<T> {
    return this.client.put<T>(url, body);
  }

  /** Delegates a typed `DELETE` to the shared client. */
  protected _delete<T>(url: string, body?: unknown): Promise<T> {
    return this.client.delete<T>(url, body);
  }

  /** Delegates a typed, fully-paginated list to the shared client. */
  protected _paginate<T>(url: string, params?: Cin7ListParams): Promise<T[]> {
    return this.client.paginate<T>(url, params);
  }
}

export default Cin7Resource;
