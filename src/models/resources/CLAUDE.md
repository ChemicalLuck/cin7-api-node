# CLAUDE.md — resource models

Hand-written TypeScript interfaces for Cin7 Omni resources. These are the payoff
of the library: precise, IntelliSense-friendly types over the raw JSON.

## Sourcing field definitions

Field lists come from Cin7's published resource models:

```
https://api.cin7.com/api/Help/ResourceModel?modelName=<ModelName>
```

Fetch that page (e.g. via WebFetch) and transcribe the field table. The endpoint
index lives at `https://api.cin7.com/api/Help`.

## Authoring rules

- **File header**: keep the two-line `// Cin7 Omni API — <Model>` + `// Source:`
  comment at the top.
- **Property names mirror the wire format exactly**: PascalCase, no renaming
  (`Id`, `CreatedDate`, `MemberId`). Cin7 quirks are preserved verbatim (e.g.
  `SerialNumber.Serialnumber` with a lowercase `n`).
- **Type mapping** (Cin7 → TS):
  - `integer` / `decimal` → `number`
  - `string` → `string`
  - `boolean` → `boolean`
  - `date` → `string` (UTC string; never `Date`)
  - `Collection(X)` → `X[]` (reference the item interface)
  - `Dictionary` (e.g. `CustomFields`) → `Record<string, unknown>`
  - enum-like named types (`OrderStatus`, `TaxStatus`, `BomItemType`, …) → `string`
- **Optionality**: mark every field optional (`?`) EXCEPT the top-level `Id`
  (which is server-assigned and always present on reads). Nested item/line
  interfaces make `Id` optional too. Some models genuinely have no `Id`
  (`StockUnit`, `Voucher`) — reflect that.
- **Input alias**: for any resource that supports create/update, add
  `export type <Model>Input = Partial<<Model>>;` (Id is server-assigned on create).
- **Docstrings**: one `/** */` line above each exported interface/type; use
  `{@link Parent}` for nested item/component types. Keep existing trailing `// `
  field comments.

## Shared sub-types

Types referenced by more than one model live in `common.ts`
(`AccountingAttributes`, `Image`, `StockMovement`, `Size`, `SubContact`). Import
from `./common` rather than redeclaring. Model-specific sub-types (line items,
components) live in the same file as their parent.

## Barrel & open types

- Re-export every new file from `index.ts` (this folder); it is surfaced through
  `src/models/index.ts` and the package root.
- Where Cin7 publishes no formal model (e.g. `PaymentFee`, `PaymentPayout`), use
  an open `Record<string, unknown>` type with an explanatory comment rather than
  inventing fields.
- Note: `product-option.ts` only declares `ProductOptionInput`; the
  `ProductOption`/`UomOption` interfaces live in `product.ts` (they are nested
  under `Product`) to avoid a duplicate-export clash in the barrel.
