import type Cin7Client from "../../client";
import type { Cin7ListParams, SizeRange } from "../../models";
import Cin7Resource from "../resource";

/** `v1/SizeRanges` — read-only (get, list). */
class SizeRangesResource extends Cin7Resource {
  protected readonly resource = "SizeRanges";

  constructor(client: Cin7Client) {
    super(client);
  }

  /** Retrieves a single size range by its Cin7 Id (`GET v1/SizeRanges/{id}`). */
  get(id: number): Promise<SizeRange> {
    return this._get<SizeRange>(`${this.url}/${id}`);
  }

  /** Lists size ranges, following pagination across all pages (`GET v1/SizeRanges`). */
  list(params?: Cin7ListParams): Promise<SizeRange[]> {
    return this._paginate<SizeRange>(this.url, params);
  }
}

export { SizeRangesResource };
