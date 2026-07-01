import type Cin7Client from "../../client";
import type {
  Cin7ListParams,
  Cin7WriteResult,
  Payment,
  PaymentInput
} from "../../models";
import Cin7Resource from "../resource";

/** `v1/Payments` — get, list, create, update, delete. */
class PaymentsResource extends Cin7Resource {
  protected readonly resource = "Payments";

  constructor(client: Cin7Client) {
    super(client);
  }

  /** Retrieves a single payment by its Cin7 Id (`GET v1/Payments/{id}`). */
  get(id: number): Promise<Payment> {
    return this._get<Payment>(`${this.url}/${id}`);
  }

  /** Lists payments, following pagination across all pages (`GET v1/Payments`). */
  list(params?: Cin7ListParams): Promise<Payment[]> {
    return this._paginate<Payment>(this.url, params);
  }

  /** Creates one or more payments (`POST v1/Payments`). */
  create(body: PaymentInput[]): Promise<Cin7WriteResult[]> {
    return this._post<Cin7WriteResult[]>(this.url, body);
  }

  /** Updates one or more payments (`PUT v1/Payments`). */
  update(body: PaymentInput[]): Promise<Cin7WriteResult[]> {
    return this._put<Cin7WriteResult[]>(this.url, body);
  }

  /** Deletes a single payment by its Cin7 Id (`DELETE v1/Payments/{id}`). */
  delete(id: number): Promise<void> {
    return this._delete<void>(`${this.url}/${id}`);
  }
}

export { PaymentsResource };
