# CLAUDE.md — resource classes

One file per Cin7 endpoint. Each exports a single class extending `Cin7Resource`
(`../resource.ts`) that pins model types onto the base helpers. Classes are thin:
no HTTP, no URL building, no pagination logic — that all lives in `Cin7Client`.

## The pattern

```ts
import type Cin7Client from "../../client";
import type {
  Cin7ListParams,
  Cin7WriteResult,
  SalesOrder,
  SalesOrderInput
} from "../../models";
import Cin7Resource from "../resource";

/** `v1/SalesOrders` — get, list, create, update. */
class SalesOrdersResource extends Cin7Resource {
  protected readonly resource = "SalesOrders";

  constructor(client: Cin7Client) {
    super(client);
  }

  /** Retrieves a single sales order by its Cin7 Id (`GET v1/SalesOrders/{id}`). */
  get(id: number): Promise<SalesOrder> {
    return this._get<SalesOrder>(`${this.url}/${id}`);
  }

  /** Lists sales orders, following pagination across all pages (`GET v1/SalesOrders`). */
  list(params?: Cin7ListParams): Promise<SalesOrder[]> {
    return this._paginate<SalesOrder>(this.url, params);
  }

  /** Creates one or more sales orders (`POST v1/SalesOrders`). */
  create(body: SalesOrderInput[]): Promise<Cin7WriteResult[]> {
    return this._post<Cin7WriteResult[]>(this.url, body);
  }

  /** Updates one or more sales orders (`PUT v1/SalesOrders`). */
  update(body: SalesOrderInput[]): Promise<Cin7WriteResult[]> {
    return this._put<Cin7WriteResult[]>(this.url, body);
  }
}

export { SalesOrdersResource };
```

## Rules

- `resource` is the exact Cin7 path segment (PascalCase, e.g. `"SalesOrders"`).
- Only expose the methods the endpoint actually supports — see the method matrix
  in the root `CLAUDE.md` / `README.md`. Omit the rest (many resources are
  read-only: `get` + `list`, or `list` only).
- **Reads**: `get(id)` → `Promise<Model>`; `list(params?)` → `Promise<Model[]>`
  via `_paginate`.
- **Writes**: `create`/`update` take arrays (`ModelInput[]`) and return
  `Cin7WriteResult[]`. `delete(id)` returns `Promise<void>`.
- Every public method gets a one-line JSDoc naming the Cin7 verb + path in
  backticks (e.g. `` `GET v1/SalesOrders/{id}` ``).

## Special cases (precedents to copy)

- **`v2` path** → set `protected readonly apiVersion = "v2" as const;` (see
  `bom-masters-v2.ts`). The `url` getter picks it up automatically.
- **id-scoped update** → `cartons.ts` uses `update(id, body)` → `PUT .../{id}`.
- **Sub-paths** → `payment-fees-and-payouts.ts` calls `_get` against
  `` `${this.url}/Fees` `` and `/Payouts`.
- **Untyped payload** → `product-images.ts` accepts `body: unknown` (Cin7
  publishes no upload model).

## After adding a resource

1. Export the class from `index.ts` (this folder).
2. Add the property + instantiation to `src/index.ts` (keep alphabetical).
3. Add a `describe(...)` block to `tests/resources.test.ts` asserting `(fn, url)`
   for each method.
