import type Cin7Client from "../../client";
import type { Cin7ListParams, User } from "../../models";
import Cin7Resource from "../resource";

/** `v1/Users` — read-only (get, list). */
class UsersResource extends Cin7Resource {
  protected readonly resource = "Users";

  constructor(client: Cin7Client) {
    super(client);
  }

  /** Retrieves a single user by its Cin7 Id (`GET v1/Users/{id}`). */
  get(id: number): Promise<User> {
    return this._get<User>(`${this.url}/${id}`);
  }

  /** Lists users, following pagination across all pages (`GET v1/Users`). */
  list(params?: Cin7ListParams): Promise<User[]> {
    return this._paginate<User>(this.url, params);
  }
}

export { UsersResource };
