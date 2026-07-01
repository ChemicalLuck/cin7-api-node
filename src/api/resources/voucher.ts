import type Cin7Client from "../../client";
import type { Cin7ListParams, Voucher } from "../../models";
import Cin7Resource from "../resource";

/** `v1/Voucher` — list only. */
class VoucherResource extends Cin7Resource {
  protected readonly resource = "Voucher";

  constructor(client: Cin7Client) {
    super(client);
  }

  /** Lists vouchers, following pagination across all pages (`GET v1/Voucher`). */
  list(params?: Cin7ListParams): Promise<Voucher[]> {
    return this._paginate<Voucher>(this.url, params);
  }
}

export { VoucherResource };
