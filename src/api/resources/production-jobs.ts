import type Cin7Client from "../../client";
import type {
  Cin7ListParams,
  Cin7WriteResult,
  ProductionJob,
  ProductionJobInput
} from "../../models";
import Cin7Resource from "../resource";

/** `v1/ProductionJobs` — get, list, create, update. */
class ProductionJobsResource extends Cin7Resource {
  protected readonly resource = "ProductionJobs";

  constructor(client: Cin7Client) {
    super(client);
  }

  /** Retrieves a single production job by its Cin7 Id (`GET v1/ProductionJobs/{id}`). */
  get(id: number): Promise<ProductionJob> {
    return this._get<ProductionJob>(`${this.url}/${id}`);
  }

  /** Lists production jobs, following pagination across all pages (`GET v1/ProductionJobs`). */
  list(params?: Cin7ListParams): Promise<ProductionJob[]> {
    return this._paginate<ProductionJob>(this.url, params);
  }

  /** Creates one or more production jobs (`POST v1/ProductionJobs`). */
  create(body: ProductionJobInput[]): Promise<Cin7WriteResult[]> {
    return this._post<Cin7WriteResult[]>(this.url, body);
  }

  /** Updates one or more production jobs (`PUT v1/ProductionJobs`). */
  update(body: ProductionJobInput[]): Promise<Cin7WriteResult[]> {
    return this._put<Cin7WriteResult[]>(this.url, body);
  }
}

export { ProductionJobsResource };
