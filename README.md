# cin7-omni-api-node

A fully typed, dependency-free Node.js client for the [Cin7 Omni API](https://api.cin7.com/api).

> **Cin7 Omni, not Core.** This targets Cin7 **Omni** (`api.cin7.com`). If you're on Cin7 **Core** (formerly DEAR, `inventory.dearsystems.com`), use `@chemicalluck/cin7-core-api-node` instead.

- **Type-safe** — hand-written TypeScript interfaces for every resource model and list query.
- **Zero runtime dependencies** — uses the native `fetch` in Node 20+.
- **Batteries included** — HTTP Basic auth, automatic retries (429 + 5xx, honoring `Retry-After`), and transparent page-based pagination.
- **Dual ESM + CJS** builds with bundled type declarations.

## Installation

```bash
npm install @chemicalluck/cin7-omni-api-node
```

Requires Node.js 20 or newer.

## Usage

Create a client with your Cin7 API connection **username** and **key** (these form the HTTP Basic credentials):

```ts
import { Cin7 } from "@chemicalluck/cin7-omni-api-node";

const cin7 = new Cin7("api-username", "api-key");

// Fetch a single record — fully typed as `SalesOrder`.
const order = await cin7.salesOrders.get(12345);

// List records — pagination is followed automatically and returns SalesOrder[].
const openOrders = await cin7.salesOrders.list({
  where: "Stage='New'",
  order: "CreatedDate DESC",
  fields: "Id,Reference,Total"
});

// Create / update accept arrays of records and return per-record results.
const results = await cin7.salesOrders.create([
  { Reference: "SO-1001", MemberId: 42 }
]);
```

### List query parameters

All `list()` methods accept the standard Cin7 list parameters:

| Param    | Type     | Description                                                      |
| -------- | -------- | ---------------------------------------------------------------- |
| `fields` | `string` | Comma-separated fields to return, e.g. `"Id,Reference,Total"`.   |
| `where`  | `string` | Filter expression, e.g. `"Status='FULLYSHIPPED' AND Total>100"`. |
| `order`  | `string` | Sort expression, e.g. `"CreatedDate ASC"`.                       |
| `page`   | `number` | 1-based starting page (pagination continues automatically).      |
| `rows`   | `number` | Page size (default 250).                                         |

`list()` transparently walks every page and returns the full concatenated array. `fields`, `where`, and `order` are applied to every page.

### Error handling

Non-2xx responses throw `Cin7HTTPResponseError` carrying the status and parsed body. Retries (429 + 5xx, up to 3 attempts) and pagination are transparent to the caller.

```ts
import { Cin7HTTPResponseError } from "@chemicalluck/cin7-omni-api-node";

try {
  await cin7.products.get(999999);
} catch (error) {
  if (error instanceof Cin7HTTPResponseError) {
    console.error(error.status, error.body);
  }
}
```

## Resources

| Resource                 | Methods                           |
| ------------------------ | --------------------------------- |
| `adjustments`            | get, list, create, update         |
| `bomMasters`             | get, list                         |
| `bomMastersV2`           | get, list (v2 path)               |
| `branches`               | get, list, create, update         |
| `branchTransfers`        | get, list, create, update         |
| `cartons`                | get, update                       |
| `contacts`               | get, list, create, update, delete |
| `creditNotes`            | get, list, create, update         |
| `paymentFeesAndPayouts`  | fees, payouts                     |
| `payments`               | get, list, create, update, delete |
| `productCategories`      | get, list, create, update         |
| `productImages`          | create                            |
| `productionJobs`         | get, list, create, update         |
| `productOptions`         | get, list, create, update         |
| `products`               | get, list, create, update         |
| `purchaseOrders`         | get, list, create, update         |
| `quotes`                 | get, list, create, update         |
| `salesOrders`            | get, list, create, update         |
| `salesOrdersWithCartons` | get, list                         |
| `serialNumbers`          | get, list                         |
| `sizeRanges`             | get, list                         |
| `stock`                  | list                              |
| `users`                  | get, list                         |
| `voucher`                | list                              |

## Rate limits

Cin7 Omni enforces 3 requests/second, 60/minute, and 5,000/day. On a `429`, the client automatically waits for the interval indicated by the `Retry-After` header (or 1 second) and retries. See the [official documentation](https://api.cin7.com/api) for details.

## Development

```bash
npm install
npm run lint
npm run build
npm test
```

## Links

- [Cin7 Omni API documentation](https://api.cin7.com/api)
- [Cin7 Omni resource models](https://api.cin7.com/api/Help)

## License

[MIT](./LICENSE)
