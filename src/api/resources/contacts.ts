import type Cin7Client from "../../client";
import type {
  Cin7ListParams,
  Cin7WriteResult,
  Contact,
  ContactInput
} from "../../models";
import Cin7Resource from "../resource";

/** `v1/Contacts` — get, list, create, update, delete. */
class ContactsResource extends Cin7Resource {
  protected readonly resource = "Contacts";

  constructor(client: Cin7Client) {
    super(client);
  }

  /** Retrieves a single contact by its Cin7 Id (`GET v1/Contacts/{id}`). */
  get(id: number): Promise<Contact> {
    return this._get<Contact>(`${this.url}/${id}`);
  }

  /** Lists contacts, following pagination across all pages (`GET v1/Contacts`). */
  list(params?: Cin7ListParams): Promise<Contact[]> {
    return this._paginate<Contact>(this.url, params);
  }

  /** Creates one or more contacts (`POST v1/Contacts`). */
  create(body: ContactInput[]): Promise<Cin7WriteResult[]> {
    return this._post<Cin7WriteResult[]>(this.url, body);
  }

  /** Updates one or more contacts (`PUT v1/Contacts`). */
  update(body: ContactInput[]): Promise<Cin7WriteResult[]> {
    return this._put<Cin7WriteResult[]>(this.url, body);
  }

  /** Deletes a single contact by its Cin7 Id (`DELETE v1/Contacts/{id}`). */
  delete(id: number): Promise<void> {
    return this._delete<void>(`${this.url}/${id}`);
  }
}

export { ContactsResource };
