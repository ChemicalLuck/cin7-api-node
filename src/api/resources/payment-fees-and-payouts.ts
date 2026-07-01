import type Cin7Client from "../../client";
import type { Cin7ListParams, PaymentFee, PaymentPayout } from "../../models";
import Cin7Resource from "../resource";

/**
 * `v1/PaymentFeesAndPayouts` — exposes the `/Fees` and `/Payouts` sub-paths.
 */
class PaymentFeesAndPayoutsResource extends Cin7Resource {
  protected readonly resource = "PaymentFeesAndPayouts";

  constructor(client: Cin7Client) {
    super(client);
  }

  /** Lists payment fees (`GET v1/PaymentFeesAndPayouts/Fees`). */
  fees(params?: Cin7ListParams): Promise<PaymentFee[]> {
    return this._get<PaymentFee[]>(`${this.url}/Fees`, params);
  }

  /** Lists payment payouts (`GET v1/PaymentFeesAndPayouts/Payouts`). */
  payouts(params?: Cin7ListParams): Promise<PaymentPayout[]> {
    return this._get<PaymentPayout[]>(`${this.url}/Payouts`, params);
  }
}

export { PaymentFeesAndPayoutsResource };
