import type Cin7Client from "../../client";
import type {
  Cin7ListParams,
  Cin7WriteResult,
  CreditNote,
  CreditNoteInput
} from "../../models";
import Cin7Resource from "../resource";

/** `v1/CreditNotes` — get, list, create, update. */
class CreditNotesResource extends Cin7Resource {
  protected readonly resource = "CreditNotes";

  constructor(client: Cin7Client) {
    super(client);
  }

  /** Retrieves a single credit note by its Cin7 Id (`GET v1/CreditNotes/{id}`). */
  get(id: number): Promise<CreditNote> {
    return this._get<CreditNote>(`${this.url}/${id}`);
  }

  /** Lists credit notes, following pagination across all pages (`GET v1/CreditNotes`). */
  list(params?: Cin7ListParams): Promise<CreditNote[]> {
    return this._paginate<CreditNote>(this.url, params);
  }

  /** Creates one or more credit notes (`POST v1/CreditNotes`). */
  create(body: CreditNoteInput[]): Promise<Cin7WriteResult[]> {
    return this._post<Cin7WriteResult[]>(this.url, body);
  }

  /** Updates one or more credit notes (`PUT v1/CreditNotes`). */
  update(body: CreditNoteInput[]): Promise<Cin7WriteResult[]> {
    return this._put<Cin7WriteResult[]>(this.url, body);
  }
}

export { CreditNotesResource };
