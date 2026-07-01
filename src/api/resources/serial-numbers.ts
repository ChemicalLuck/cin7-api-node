import type Cin7Client from "../../client";
import type { Cin7ListParams, SerialNumber } from "../../models";
import Cin7Resource from "../resource";

/** `v1/SerialNumbers` — read-only (get, list). */
class SerialNumbersResource extends Cin7Resource {
  protected readonly resource = "SerialNumbers";

  constructor(client: Cin7Client) {
    super(client);
  }

  /** Retrieves a single serial number by its Cin7 Id (`GET v1/SerialNumbers/{id}`). */
  get(id: number): Promise<SerialNumber> {
    return this._get<SerialNumber>(`${this.url}/${id}`);
  }

  /** Lists serial numbers, following pagination across all pages (`GET v1/SerialNumbers`). */
  list(params?: Cin7ListParams): Promise<SerialNumber[]> {
    return this._paginate<SerialNumber>(this.url, params);
  }
}

export { SerialNumbersResource };
