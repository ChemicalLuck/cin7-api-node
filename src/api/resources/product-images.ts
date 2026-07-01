import type Cin7Client from "../../client";
import type { Cin7WriteResult } from "../../models";
import Cin7Resource from "../resource";

/**
 * `v1/ProductImages` — create only. Cin7 does not publish a formal request
 * model for image uploads, so the payload is left as `unknown`.
 */
class ProductImagesResource extends Cin7Resource {
  protected readonly resource = "ProductImages";

  constructor(client: Cin7Client) {
    super(client);
  }

  /** Uploads a single product image (`POST v1/ProductImages`). */
  create(body: unknown): Promise<Cin7WriteResult[]> {
    return this._post<Cin7WriteResult[]>(this.url, body);
  }
}

export { ProductImagesResource };
