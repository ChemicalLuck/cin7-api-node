import type Cin7Client from "../../client";
import type {
  Cin7ListParams,
  Cin7WriteResult,
  Product,
  ProductInput
} from "../../models";
import Cin7Resource from "../resource";

/** `v1/Products` — get, list, create, update. */
class ProductsResource extends Cin7Resource {
  protected readonly resource = "Products";

  constructor(client: Cin7Client) {
    super(client);
  }

  /** Retrieves a single product by its Cin7 Id (`GET v1/Products/{id}`). */
  get(id: number): Promise<Product> {
    return this._get<Product>(`${this.url}/${id}`);
  }

  /** Lists products, following pagination across all pages (`GET v1/Products`). */
  list(params?: Cin7ListParams): Promise<Product[]> {
    return this._paginate<Product>(this.url, params);
  }

  /** Creates one or more products (`POST v1/Products`). */
  create(body: ProductInput[]): Promise<Cin7WriteResult[]> {
    return this._post<Cin7WriteResult[]>(this.url, body);
  }

  /** Updates one or more products (`PUT v1/Products`). */
  update(body: ProductInput[]): Promise<Cin7WriteResult[]> {
    return this._put<Cin7WriteResult[]>(this.url, body);
  }
}

export { ProductsResource };
