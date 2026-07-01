import type Cin7Client from "../../client";
import type {
  BranchTransfer,
  BranchTransferInput,
  Cin7ListParams,
  Cin7WriteResult
} from "../../models";
import Cin7Resource from "../resource";

/** `v1/BranchTransfers` — get, list, create, update. */
class BranchTransfersResource extends Cin7Resource {
  protected readonly resource = "BranchTransfers";

  constructor(client: Cin7Client) {
    super(client);
  }

  /** Retrieves a single branch transfer by its Cin7 Id (`GET v1/BranchTransfers/{id}`). */
  get(id: number): Promise<BranchTransfer> {
    return this._get<BranchTransfer>(`${this.url}/${id}`);
  }

  /** Lists branch transfers, following pagination across all pages (`GET v1/BranchTransfers`). */
  list(params?: Cin7ListParams): Promise<BranchTransfer[]> {
    return this._paginate<BranchTransfer>(this.url, params);
  }

  /** Creates one or more branch transfers (`POST v1/BranchTransfers`). */
  create(body: BranchTransferInput[]): Promise<Cin7WriteResult[]> {
    return this._post<Cin7WriteResult[]>(this.url, body);
  }

  /** Updates one or more branch transfers (`PUT v1/BranchTransfers`). */
  update(body: BranchTransferInput[]): Promise<Cin7WriteResult[]> {
    return this._put<Cin7WriteResult[]>(this.url, body);
  }
}

export { BranchTransfersResource };
