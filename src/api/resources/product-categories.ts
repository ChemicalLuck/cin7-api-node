import type Cin7Client from "../../client";
import type {
  Cin7ListParams,
  Cin7WriteResult,
  ProductCategory,
  ProductCategoryInput
} from "../../models";
import Cin7Resource from "../resource";

/** `v1/ProductCategories` — get, list, create, update. */
class ProductCategoriesResource extends Cin7Resource {
  protected readonly resource = "ProductCategories";

  constructor(client: Cin7Client) {
    super(client);
  }

  /** Retrieves a single product category by its Cin7 Id (`GET v1/ProductCategories/{id}`). */
  get(id: number): Promise<ProductCategory> {
    return this._get<ProductCategory>(`${this.url}/${id}`);
  }

  /** Lists product categories, following pagination across all pages (`GET v1/ProductCategories`). */
  list(params?: Cin7ListParams): Promise<ProductCategory[]> {
    return this._paginate<ProductCategory>(this.url, params);
  }

  /** Creates one or more product categories (`POST v1/ProductCategories`). */
  create(body: ProductCategoryInput[]): Promise<Cin7WriteResult[]> {
    return this._post<Cin7WriteResult[]>(this.url, body);
  }

  /** Updates one or more product categories (`PUT v1/ProductCategories`). */
  update(body: ProductCategoryInput[]): Promise<Cin7WriteResult[]> {
    return this._put<Cin7WriteResult[]>(this.url, body);
  }
}

export { ProductCategoriesResource };
