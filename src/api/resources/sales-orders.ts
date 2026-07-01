import type Cin7Client from "../../client";
import type {
  Cin7ListParams,
  Cin7WriteResult,
  SalesOrder,
  SalesOrderInput
} from "../../models";
import Cin7Resource from "../resource";

/** `v1/SalesOrders` — get, list, create, update. */
class SalesOrdersResource extends Cin7Resource {
  protected readonly resource = "SalesOrders";

  constructor(client: Cin7Client) {
    super(client);
  }

  /** Retrieves a single sales order by its Cin7 Id (`GET v1/SalesOrders/{id}`). */
  get(id: number): Promise<SalesOrder> {
    return this._get<SalesOrder>(`${this.url}/${id}`);
  }

  /** Lists sales orders, following pagination across all pages (`GET v1/SalesOrders`). */
  list(params?: Cin7ListParams): Promise<SalesOrder[]> {
    return this._paginate<SalesOrder>(this.url, params);
  }

  /** Creates one or more sales orders (`POST v1/SalesOrders`). */
  create(body: SalesOrderInput[]): Promise<Cin7WriteResult[]> {
    return this._post<Cin7WriteResult[]>(this.url, body);
  }

  /** Updates one or more sales orders (`PUT v1/SalesOrders`). */
  update(body: SalesOrderInput[]): Promise<Cin7WriteResult[]> {
    return this._put<Cin7WriteResult[]>(this.url, body);
  }
}

export { SalesOrdersResource };
