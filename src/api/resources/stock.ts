import type Cin7Client from "../../client";
import type { Cin7ListParams, StockUnit } from "../../models";
import Cin7Resource from "../resource";

/** `v1/Stock` — list only. */
class StockResource extends Cin7Resource {
  protected readonly resource = "Stock";

  constructor(client: Cin7Client) {
    super(client);
  }

  /** Lists stock records, following pagination across all pages (`GET v1/Stock`). */
  list(params?: Cin7ListParams): Promise<StockUnit[]> {
    return this._paginate<StockUnit>(this.url, params);
  }
}

export { StockResource };
