# CLAUDE.md — tests

Vitest, Node environment. Two files, two distinct strategies. Run with
`npm test` (or `npm run test:watch`).

## `client.test.ts` — HTTP layer

Exercises `Cin7Client` against a **mocked global `fetch`**:

- `vi.stubGlobal("fetch", mockedFetch)` in `beforeEach`; `vi.unstubAllGlobals()`
  in `afterEach`.
- `fakeResponse({ status, body, headers })` builds a minimal `Response`-like
  object (`status`, `ok`, `headers.get`, `text()`).
- `requests()` maps `mockedFetch.mock.calls` to `{ url, init }` for assertions.
- Use fake timers (`vi.useFakeTimers()` + `vi.runAllTimersAsync()` /
  `advanceTimersByTimeAsync`) for retry/backoff tests.

Covers: Basic auth header, absence of any version header, body serialization,
204/empty handling, `Cin7HTTPResponseError` / `Cin7APIError`, retries +
`Retry-After`, and page-based pagination (default `rows=250`, short-page
termination, filters resent on every page).

Note: `URLSearchParams` encodes spaces as `+`, which `decodeURIComponent` does
not reverse — normalize with `.replace(/\+/g, " ")` before asserting on query
strings.

## `resources.test.ts` — resource wiring

Verifies each resource method calls the right client method with the right URL,
using an **injected mock client** (not a mocked `fetch`):

- `makeClient()` returns an object of `vi.fn`s (`get/post/put/delete/paginate`)
  that push `{ fn, url, body }` into a `calls` array; inject via
  `new Cin7("test-user", "test-key", makeClient())`.
- The `run([...])` table-driven helper asserts a single call with the expected
  `fn` and `url`.

When you add a resource or method, add a `describe(...)` block here. Include the
`/v2/` path assertion for `bomMastersV2`, the id-scoped `cartons.update`, the
`delete` methods, and the `paymentFeesAndPayouts` sub-paths as precedents.
