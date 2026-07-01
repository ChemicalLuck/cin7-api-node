import type Cin7Client from "../../client";
import type {
  Adjustment,
  AdjustmentInput,
  Cin7ListParams,
  Cin7WriteResult
} from "../../models";
import Cin7Resource from "../resource";

/** `v1/Adjustments` — get, list, create, update. */
class AdjustmentsResource extends Cin7Resource {
  protected readonly resource = "Adjustments";

  constructor(client: Cin7Client) {
    super(client);
  }

  /** Retrieves a single adjustment by its Cin7 Id (`GET v1/Adjustments/{id}`). */
  get(id: number): Promise<Adjustment> {
    return this._get<Adjustment>(`${this.url}/${id}`);
  }

  /** Lists adjustments, following pagination across all pages (`GET v1/Adjustments`). */
  list(params?: Cin7ListParams): Promise<Adjustment[]> {
    return this._paginate<Adjustment>(this.url, params);
  }

  /** Creates one or more adjustments (`POST v1/Adjustments`). */
  create(body: AdjustmentInput[]): Promise<Cin7WriteResult[]> {
    return this._post<Cin7WriteResult[]>(this.url, body);
  }

  /** Updates one or more adjustments (`PUT v1/Adjustments`). */
  update(body: AdjustmentInput[]): Promise<Cin7WriteResult[]> {
    return this._put<Cin7WriteResult[]>(this.url, body);
  }
}

export { AdjustmentsResource };
