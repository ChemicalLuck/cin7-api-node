import type Cin7Client from "../../client";
import type {
  Cin7ListParams,
  Cin7WriteResult,
  PurchaseOrder,
  PurchaseOrderInput
} from "../../models";
import Cin7Resource from "../resource";

/** `v1/PurchaseOrders` — get, list, create, update. */
class PurchaseOrdersResource extends Cin7Resource {
  protected readonly resource = "PurchaseOrders";

  constructor(client: Cin7Client) {
    super(client);
  }

  /** Retrieves a single purchase order by its Cin7 Id (`GET v1/PurchaseOrders/{id}`). */
  get(id: number): Promise<PurchaseOrder> {
    return this._get<PurchaseOrder>(`${this.url}/${id}`);
  }

  /** Lists purchase orders, following pagination across all pages (`GET v1/PurchaseOrders`). */
  list(params?: Cin7ListParams): Promise<PurchaseOrder[]> {
    return this._paginate<PurchaseOrder>(this.url, params);
  }

  /** Creates one or more purchase orders (`POST v1/PurchaseOrders`). */
  create(body: PurchaseOrderInput[]): Promise<Cin7WriteResult[]> {
    return this._post<Cin7WriteResult[]>(this.url, body);
  }

  /** Updates one or more purchase orders (`PUT v1/PurchaseOrders`). */
  update(body: PurchaseOrderInput[]): Promise<Cin7WriteResult[]> {
    return this._put<Cin7WriteResult[]>(this.url, body);
  }
}

export { PurchaseOrdersResource };
