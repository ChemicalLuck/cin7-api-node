import type Cin7Client from "../../client";
import type {
  Cin7ListParams,
  Cin7WriteResult,
  ProductOption,
  ProductOptionInput
} from "../../models";
import Cin7Resource from "../resource";

/** `v1/ProductOptions` — get, list, create, update. */
class ProductOptionsResource extends Cin7Resource {
  protected readonly resource = "ProductOptions";

  constructor(client: Cin7Client) {
    super(client);
  }

  /** Retrieves a single product option by its Cin7 Id (`GET v1/ProductOptions/{id}`). */
  get(id: number): Promise<ProductOption> {
    return this._get<ProductOption>(`${this.url}/${id}`);
  }

  /** Lists product options, following pagination across all pages (`GET v1/ProductOptions`). */
  list(params?: Cin7ListParams): Promise<ProductOption[]> {
    return this._paginate<ProductOption>(this.url, params);
  }

  /** Creates one or more product options (`POST v1/ProductOptions`). */
  create(body: ProductOptionInput[]): Promise<Cin7WriteResult[]> {
    return this._post<Cin7WriteResult[]>(this.url, body);
  }

  /** Updates one or more product options (`PUT v1/ProductOptions`). */
  update(body: ProductOptionInput[]): Promise<Cin7WriteResult[]> {
    return this._put<Cin7WriteResult[]>(this.url, body);
  }
}

export { ProductOptionsResource };
