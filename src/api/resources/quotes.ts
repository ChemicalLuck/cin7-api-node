import type Cin7Client from "../../client";
import type {
  Cin7ListParams,
  Cin7WriteResult,
  Quote,
  QuoteInput
} from "../../models";
import Cin7Resource from "../resource";

/** `v1/Quotes` — get, list, create, update. */
class QuotesResource extends Cin7Resource {
  protected readonly resource = "Quotes";

  constructor(client: Cin7Client) {
    super(client);
  }

  /** Retrieves a single quote by its Cin7 Id (`GET v1/Quotes/{id}`). */
  get(id: number): Promise<Quote> {
    return this._get<Quote>(`${this.url}/${id}`);
  }

  /** Lists quotes, following pagination across all pages (`GET v1/Quotes`). */
  list(params?: Cin7ListParams): Promise<Quote[]> {
    return this._paginate<Quote>(this.url, params);
  }

  /** Creates one or more quotes (`POST v1/Quotes`). */
  create(body: QuoteInput[]): Promise<Cin7WriteResult[]> {
    return this._post<Cin7WriteResult[]>(this.url, body);
  }

  /** Updates one or more quotes (`PUT v1/Quotes`). */
  update(body: QuoteInput[]): Promise<Cin7WriteResult[]> {
    return this._put<Cin7WriteResult[]>(this.url, body);
  }
}

export { QuotesResource };
