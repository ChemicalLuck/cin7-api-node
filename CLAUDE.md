# CLAUDE.md

Guidance for working in this repository.

## What this is

`@chemicalluck/cin7-api-node` — a fully typed, **zero-runtime-dependency** Node.js
client for the [Cin7 Omni API](https://api.cin7.com/api). Published as dual
ESM + CJS with bundled `.d.ts` declarations.

## Commands

```bash
npm install        # install dev deps (no runtime deps)
npm run build      # tsup → dist/ (ESM + CJS + .d.ts)
npm run typecheck  # tsc --noEmit (type-checks src + tests)
npm test           # vitest run (unit tests in tests/)
npm run test:watch # vitest watch mode
npm run lint       # eslint (flat config) over src/
npm run format:all # prettier --write .
```

CI (`.github/workflows/ci.yml`) runs `lint → build → test` on Node 20 and 24.
Always get all three green before considering a change done.

## Architecture

A single HTTP client is shared by thin, per-resource classes:

- **`src/client.ts`** — `Cin7Client`. Owns auth, the retry loop, JSON extraction,
  and pagination. This is the only file that talks to `fetch`.
- **`src/api/resource.ts`** — `Cin7Resource`, the abstract base. Builds the
  endpoint URL from `resource` + `apiVersion` and exposes typed `_get/_post/
  _put/_delete/_paginate` helpers that delegate to the client.
- **`src/api/resources/*.ts`** — one class per Cin7 endpoint. Each pins the model
  types onto the base helpers. See `src/api/resources/CLAUDE.md`.
- **`src/models/`** — errors, the `RequestMethod` enum, `Cin7ListParams` /
  `Cin7WriteResult`, and per-resource model interfaces under `resources/`.
  See `src/models/resources/CLAUDE.md`.
- **`src/index.ts`** — the `Cin7` class wires every resource onto a shared client
  as a flat property (`cin7.salesOrders`, `cin7.products`, …) and re-exports all
  models. The constructor takes `(username, apiKey, client?)`; the optional
  `client` is the seam used to inject a mock in tests.

## Cin7 Omni API facts that shape the code

- **Base URL** `https://api.cin7.com/api`; the version is a **path segment**
  (`/v1/…`, rarely `/v2/…`), NOT a header. There is effectively one API, so
  resources are exposed flat rather than under a `v1`/`v2` namespace.
- **Auth** is HTTP Basic: `Authorization: Basic base64("<username>:<apiKey>")`.
- **Rate limits** 3/s, 60/min, 5000/day → `429` with a `Retry-After` header. The
  client retries `429` + `5xx` up to 3 times, honoring `Retry-After`.
- **List responses are bare JSON arrays** (no envelope, no cursor). Pagination
  increments `page` until a page returns `< rows` records (default `rows=250`).
  `list()` transparently returns the full concatenated array.
- **Field casing is PascalCase** on the wire (`Id`, `CreatedDate`, `MemberId`).
  Model interfaces mirror the wire format exactly — do not camelCase-rename.
- **Dates** are UTC strings (`yyyy-MM-ddTHH:mm:ssZ`) → typed as `string`.
- **Writes** (`POST`/`PUT`) take and return **arrays** of records; results are
  typed as `Cin7WriteResult[]`.

## Conventions

- **No runtime dependencies.** Use the global `fetch` (Node 20+). Do not add a
  runtime dep without a very good reason — it changes the value proposition.
- **Type-safety is the point.** Prefer precise model types over `unknown`. Where
  Cin7 publishes no model (e.g. payment fees/payouts, image uploads), an open
  type with a comment is acceptable.
- **Relative imports** within `src` (no path alias — kept out so tsup/TS 6+ never
  need the deprecated `baseUrl`). Tests import from `../src/...`.
- **Docstrings**: every public method and exported interface/type carries a
  concise JSDoc block; model properties keep trailing `// ` field comments.
- Tooling: ESLint 9 **flat config** (`eslint.config.mjs`), Prettier
  (`trailingComma: none`), tsup, vitest, TypeScript strict.

## Adding functionality

- New endpoint → follow `src/api/resources/CLAUDE.md`, then wire it into
  `src/api/resources/index.ts` and `src/index.ts`, and add a case to
  `tests/resources.test.ts`.
- New/updated model → follow `src/models/resources/CLAUDE.md`.
- Client behavior (auth, retry, pagination) is covered by `tests/client.test.ts`;
  update it alongside any change to `src/client.ts`.
