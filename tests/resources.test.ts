import { describe, it, expect, vi, beforeEach } from "vitest";
import { Cin7 } from "../src/index";
import type Cin7Client from "../src/client";

const B = "https://api.cin7.com/api";

interface Call {
  fn: "get" | "post" | "put" | "delete" | "paginate";
  url: string;
  body?: unknown;
}

let calls: Call[];
let cin7: Cin7;

function makeClient(): Cin7Client {
  return {
    get: vi.fn((url: string) => {
      calls.push({ fn: "get", url });
      return Promise.resolve({});
    }),
    post: vi.fn((url: string, body?: unknown) => {
      calls.push({ fn: "post", url, body });
      return Promise.resolve([]);
    }),
    put: vi.fn((url: string, body?: unknown) => {
      calls.push({ fn: "put", url, body });
      return Promise.resolve([]);
    }),
    delete: vi.fn((url: string, body?: unknown) => {
      calls.push({ fn: "delete", url, body });
      return Promise.resolve(undefined);
    }),
    paginate: vi.fn((url: string) => {
      calls.push({ fn: "paginate", url });
      return Promise.resolve([]);
    })
  } as unknown as Cin7Client;
}

beforeEach(() => {
  calls = [];
  cin7 = new Cin7("test-user", "test-key", makeClient());
});

type Expectation = [
  label: string,
  invoke: () => Promise<unknown>,
  fn: Call["fn"],
  url: string
];

function run(cases: Expectation[]) {
  for (const [label, invoke, fn, url] of cases) {
    it(label, async () => {
      calls = [];
      await invoke();
      expect(calls).toHaveLength(1);
      const [call] = calls;
      expect(call?.fn).toBe(fn);
      expect(call?.url).toBe(url);
    });
  }
}

describe("adjustments", () =>
  run([
    ["get", () => cin7.adjustments.get(1), "get", `${B}/v1/Adjustments/1`],
    ["list", () => cin7.adjustments.list(), "paginate", `${B}/v1/Adjustments`],
    [
      "create",
      () => cin7.adjustments.create([]),
      "post",
      `${B}/v1/Adjustments`
    ],
    ["update", () => cin7.adjustments.update([]), "put", `${B}/v1/Adjustments`]
  ]));

describe("bomMasters (v1)", () =>
  run([
    ["get", () => cin7.bomMasters.get(1), "get", `${B}/v1/BomMasters/1`],
    ["list", () => cin7.bomMasters.list(), "paginate", `${B}/v1/BomMasters`]
  ]));

describe("bomMastersV2 (v2 path)", () =>
  run([
    ["get", () => cin7.bomMastersV2.get(1), "get", `${B}/v2/BomMasters/1`],
    ["list", () => cin7.bomMastersV2.list(), "paginate", `${B}/v2/BomMasters`]
  ]));

describe("branches", () =>
  run([
    ["get", () => cin7.branches.get(1), "get", `${B}/v1/Branches/1`],
    ["list", () => cin7.branches.list(), "paginate", `${B}/v1/Branches`],
    ["create", () => cin7.branches.create([]), "post", `${B}/v1/Branches`],
    ["update", () => cin7.branches.update([]), "put", `${B}/v1/Branches`]
  ]));

describe("branchTransfers", () =>
  run([
    [
      "get",
      () => cin7.branchTransfers.get(1),
      "get",
      `${B}/v1/BranchTransfers/1`
    ],
    [
      "list",
      () => cin7.branchTransfers.list(),
      "paginate",
      `${B}/v1/BranchTransfers`
    ],
    [
      "create",
      () => cin7.branchTransfers.create([]),
      "post",
      `${B}/v1/BranchTransfers`
    ],
    [
      "update",
      () => cin7.branchTransfers.update([]),
      "put",
      `${B}/v1/BranchTransfers`
    ]
  ]));

describe("cartons", () =>
  run([
    ["get", () => cin7.cartons.get(1), "get", `${B}/v1/Cartons/1`],
    ["update", () => cin7.cartons.update(1, {}), "put", `${B}/v1/Cartons/1`]
  ]));

describe("contacts", () =>
  run([
    ["get", () => cin7.contacts.get(1), "get", `${B}/v1/Contacts/1`],
    ["list", () => cin7.contacts.list(), "paginate", `${B}/v1/Contacts`],
    ["create", () => cin7.contacts.create([]), "post", `${B}/v1/Contacts`],
    ["update", () => cin7.contacts.update([]), "put", `${B}/v1/Contacts`],
    ["delete", () => cin7.contacts.delete(1), "delete", `${B}/v1/Contacts/1`]
  ]));

describe("creditNotes", () =>
  run([
    ["get", () => cin7.creditNotes.get(1), "get", `${B}/v1/CreditNotes/1`],
    ["list", () => cin7.creditNotes.list(), "paginate", `${B}/v1/CreditNotes`],
    [
      "create",
      () => cin7.creditNotes.create([]),
      "post",
      `${B}/v1/CreditNotes`
    ],
    ["update", () => cin7.creditNotes.update([]), "put", `${B}/v1/CreditNotes`]
  ]));

describe("paymentFeesAndPayouts", () =>
  run([
    [
      "fees",
      () => cin7.paymentFeesAndPayouts.fees(),
      "get",
      `${B}/v1/PaymentFeesAndPayouts/Fees`
    ],
    [
      "payouts",
      () => cin7.paymentFeesAndPayouts.payouts(),
      "get",
      `${B}/v1/PaymentFeesAndPayouts/Payouts`
    ]
  ]));

describe("payments", () =>
  run([
    ["get", () => cin7.payments.get(1), "get", `${B}/v1/Payments/1`],
    ["list", () => cin7.payments.list(), "paginate", `${B}/v1/Payments`],
    ["create", () => cin7.payments.create([]), "post", `${B}/v1/Payments`],
    ["update", () => cin7.payments.update([]), "put", `${B}/v1/Payments`],
    ["delete", () => cin7.payments.delete(1), "delete", `${B}/v1/Payments/1`]
  ]));

describe("productCategories", () =>
  run([
    [
      "get",
      () => cin7.productCategories.get(1),
      "get",
      `${B}/v1/ProductCategories/1`
    ],
    [
      "list",
      () => cin7.productCategories.list(),
      "paginate",
      `${B}/v1/ProductCategories`
    ],
    [
      "create",
      () => cin7.productCategories.create([]),
      "post",
      `${B}/v1/ProductCategories`
    ],
    [
      "update",
      () => cin7.productCategories.update([]),
      "put",
      `${B}/v1/ProductCategories`
    ]
  ]));

describe("productImages", () =>
  run([
    [
      "create",
      () => cin7.productImages.create({}),
      "post",
      `${B}/v1/ProductImages`
    ]
  ]));

describe("productionJobs", () =>
  run([
    [
      "get",
      () => cin7.productionJobs.get(1),
      "get",
      `${B}/v1/ProductionJobs/1`
    ],
    [
      "list",
      () => cin7.productionJobs.list(),
      "paginate",
      `${B}/v1/ProductionJobs`
    ],
    [
      "create",
      () => cin7.productionJobs.create([]),
      "post",
      `${B}/v1/ProductionJobs`
    ],
    [
      "update",
      () => cin7.productionJobs.update([]),
      "put",
      `${B}/v1/ProductionJobs`
    ]
  ]));

describe("productOptions", () =>
  run([
    [
      "get",
      () => cin7.productOptions.get(1),
      "get",
      `${B}/v1/ProductOptions/1`
    ],
    [
      "list",
      () => cin7.productOptions.list(),
      "paginate",
      `${B}/v1/ProductOptions`
    ],
    [
      "create",
      () => cin7.productOptions.create([]),
      "post",
      `${B}/v1/ProductOptions`
    ],
    [
      "update",
      () => cin7.productOptions.update([]),
      "put",
      `${B}/v1/ProductOptions`
    ]
  ]));

describe("products", () =>
  run([
    ["get", () => cin7.products.get(1), "get", `${B}/v1/Products/1`],
    ["list", () => cin7.products.list(), "paginate", `${B}/v1/Products`],
    ["create", () => cin7.products.create([]), "post", `${B}/v1/Products`],
    ["update", () => cin7.products.update([]), "put", `${B}/v1/Products`]
  ]));

describe("purchaseOrders", () =>
  run([
    [
      "get",
      () => cin7.purchaseOrders.get(1),
      "get",
      `${B}/v1/PurchaseOrders/1`
    ],
    [
      "list",
      () => cin7.purchaseOrders.list(),
      "paginate",
      `${B}/v1/PurchaseOrders`
    ],
    [
      "create",
      () => cin7.purchaseOrders.create([]),
      "post",
      `${B}/v1/PurchaseOrders`
    ],
    [
      "update",
      () => cin7.purchaseOrders.update([]),
      "put",
      `${B}/v1/PurchaseOrders`
    ]
  ]));

describe("quotes", () =>
  run([
    ["get", () => cin7.quotes.get(1), "get", `${B}/v1/Quotes/1`],
    ["list", () => cin7.quotes.list(), "paginate", `${B}/v1/Quotes`],
    ["create", () => cin7.quotes.create([]), "post", `${B}/v1/Quotes`],
    ["update", () => cin7.quotes.update([]), "put", `${B}/v1/Quotes`]
  ]));

describe("salesOrders", () =>
  run([
    ["get", () => cin7.salesOrders.get(1), "get", `${B}/v1/SalesOrders/1`],
    ["list", () => cin7.salesOrders.list(), "paginate", `${B}/v1/SalesOrders`],
    [
      "create",
      () => cin7.salesOrders.create([]),
      "post",
      `${B}/v1/SalesOrders`
    ],
    ["update", () => cin7.salesOrders.update([]), "put", `${B}/v1/SalesOrders`]
  ]));

describe("salesOrdersWithCartons", () =>
  run([
    [
      "get",
      () => cin7.salesOrdersWithCartons.get(1),
      "get",
      `${B}/v1/SalesOrdersWithCartons/1`
    ],
    [
      "list",
      () => cin7.salesOrdersWithCartons.list(),
      "paginate",
      `${B}/v1/SalesOrdersWithCartons`
    ]
  ]));

describe("serialNumbers", () =>
  run([
    ["get", () => cin7.serialNumbers.get(1), "get", `${B}/v1/SerialNumbers/1`],
    [
      "list",
      () => cin7.serialNumbers.list(),
      "paginate",
      `${B}/v1/SerialNumbers`
    ]
  ]));

describe("sizeRanges", () =>
  run([
    ["get", () => cin7.sizeRanges.get(1), "get", `${B}/v1/SizeRanges/1`],
    ["list", () => cin7.sizeRanges.list(), "paginate", `${B}/v1/SizeRanges`]
  ]));

describe("stock", () =>
  run([["list", () => cin7.stock.list(), "paginate", `${B}/v1/Stock`]]));

describe("users", () =>
  run([
    ["get", () => cin7.users.get(1), "get", `${B}/v1/Users/1`],
    ["list", () => cin7.users.list(), "paginate", `${B}/v1/Users`]
  ]));

describe("voucher", () =>
  run([["list", () => cin7.voucher.list(), "paginate", `${B}/v1/Voucher`]]));
