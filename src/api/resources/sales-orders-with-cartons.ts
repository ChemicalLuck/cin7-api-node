import type Cin7Client from "../../client";
import type { Cin7ListParams, SalesOrder } from "../../models";
import Cin7Resource from "../resource";

/** `v1/SalesOrdersWithCartons` — read-only (get, list). */
class SalesOrdersWithCartonsResource extends Cin7Resource {
  protected readonly resource = "SalesOrdersWithCartons";

  constructor(client: Cin7Client) {
    super(client);
  }

  /** Retrieves a single sales order (with cartons) by its Cin7 Id (`GET v1/SalesOrdersWithCartons/{id}`). */
  get(id: number): Promise<SalesOrder> {
    return this._get<SalesOrder>(`${this.url}/${id}`);
  }

  /** Lists sales orders with cartons, following pagination across all pages (`GET v1/SalesOrdersWithCartons`). */
  list(params?: Cin7ListParams): Promise<SalesOrder[]> {
    return this._paginate<SalesOrder>(this.url, params);
  }
}

export { SalesOrdersWithCartonsResource };
