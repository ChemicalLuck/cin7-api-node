import type Cin7Client from "../../client";
import type { Carton, CartonInput, Cin7WriteResult } from "../../models";
import Cin7Resource from "../resource";

/** `v1/Cartons` — get and update a single carton by id. */
class CartonsResource extends Cin7Resource {
  protected readonly resource = "Cartons";

  constructor(client: Cin7Client) {
    super(client);
  }

  /** Retrieves a single carton by its Cin7 Id (`GET v1/Cartons/{id}`). */
  get(id: number): Promise<Carton> {
    return this._get<Carton>(`${this.url}/${id}`);
  }

  /** Updates a single carton by its Cin7 Id (`PUT v1/Cartons/{id}`). */
  update(id: number, body: CartonInput): Promise<Cin7WriteResult> {
    return this._put<Cin7WriteResult>(`${this.url}/${id}`, body);
  }
}

export { CartonsResource };
