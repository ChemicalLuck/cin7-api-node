/**
 * Query parameters accepted by Cin7 Omni list endpoints.
 *
 * @see https://api.cin7.com/api — "GET Parameters" section.
 */
export interface Cin7ListParams {
  /** Comma-separated list of field names to return, e.g. `"Id,Reference,Total"`. */
  fields?: string;
  /**
   * Filter expression using Cin7 operators (`=`, `<>`, `>`, `<`, `>=`, `<=`,
   * `IS`, `LIKE`, `IN`, ...), e.g. `"Status='FULLYSHIPPED' AND Total>100"`.
   */
  where?: string;
  /** Sort expression, e.g. `"CreatedDate ASC"`. */
  order?: string;
  /** 1-based page number. */
  page?: number;
  /** Number of records per page. */
  rows?: number;
}

/**
 * The per-record result Cin7 returns from create/update (POST/PUT) endpoints,
 * which accept and return arrays of records.
 */
export interface Cin7WriteResult {
  /** The Cin7 Id of the affected record. */
  id: number;
  /** Whether the operation succeeded for this record. */
  success: boolean;
  /** Validation or processing errors for this record, if any. */
  errors?: string[];
}
