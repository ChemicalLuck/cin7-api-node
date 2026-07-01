import type Cin7Client from "../../client";
import type { BomMaster, Cin7ListParams } from "../../models";
import Cin7Resource from "../resource";

/** `v1/BomMasters` — read-only (get, list). */
class BomMastersResource extends Cin7Resource {
  protected readonly resource = "BomMasters";

  constructor(client: Cin7Client) {
    super(client);
  }

  /** Retrieves a single BOM master by its Cin7 Id (`GET v1/BomMasters/{id}`). */
  get(id: number): Promise<BomMaster> {
    return this._get<BomMaster>(`${this.url}/${id}`);
  }

  /** Lists BOM masters, following pagination across all pages (`GET v1/BomMasters`). */
  list(params?: Cin7ListParams): Promise<BomMaster[]> {
    return this._paginate<BomMaster>(this.url, params);
  }
}

export { BomMastersResource };
