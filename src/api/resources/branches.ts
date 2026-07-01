import type Cin7Client from "../../client";
import type {
  Branch,
  BranchInput,
  Cin7ListParams,
  Cin7WriteResult
} from "../../models";
import Cin7Resource from "../resource";

/** `v1/Branches` — get, list, create, update. */
class BranchesResource extends Cin7Resource {
  protected readonly resource = "Branches";

  constructor(client: Cin7Client) {
    super(client);
  }

  /** Retrieves a single branch by its Cin7 Id (`GET v1/Branches/{id}`). */
  get(id: number): Promise<Branch> {
    return this._get<Branch>(`${this.url}/${id}`);
  }

  /** Lists branches, following pagination across all pages (`GET v1/Branches`). */
  list(params?: Cin7ListParams): Promise<Branch[]> {
    return this._paginate<Branch>(this.url, params);
  }

  /** Creates one or more branches (`POST v1/Branches`). */
  create(body: BranchInput[]): Promise<Cin7WriteResult[]> {
    return this._post<Cin7WriteResult[]>(this.url, body);
  }

  /** Updates one or more branches (`PUT v1/Branches`). */
  update(body: BranchInput[]): Promise<Cin7WriteResult[]> {
    return this._put<Cin7WriteResult[]>(this.url, body);
  }
}

export { BranchesResource };
