import Cin7Client from "./client";
import * as resources from "./api/resources";

/**
 * Node.js client for the Cin7 Omni API.
 *
 * @example
 * ```ts
 * const cin7 = new Cin7("api-username", "api-key");
 * const orders = await cin7.salesOrders.list({ where: "Stage='New'" });
 * const product = await cin7.products.get(123);
 * ```
 */
class Cin7 {
  private client: Cin7Client;

  adjustments: resources.AdjustmentsResource;
  bomMasters: resources.BomMastersResource;
  bomMastersV2: resources.BomMastersV2Resource;
  branches: resources.BranchesResource;
  branchTransfers: resources.BranchTransfersResource;
  cartons: resources.CartonsResource;
  contacts: resources.ContactsResource;
  creditNotes: resources.CreditNotesResource;
  paymentFeesAndPayouts: resources.PaymentFeesAndPayoutsResource;
  payments: resources.PaymentsResource;
  productCategories: resources.ProductCategoriesResource;
  productImages: resources.ProductImagesResource;
  productionJobs: resources.ProductionJobsResource;
  productOptions: resources.ProductOptionsResource;
  products: resources.ProductsResource;
  purchaseOrders: resources.PurchaseOrdersResource;
  quotes: resources.QuotesResource;
  salesOrders: resources.SalesOrdersResource;
  salesOrdersWithCartons: resources.SalesOrdersWithCartonsResource;
  serialNumbers: resources.SerialNumbersResource;
  sizeRanges: resources.SizeRangesResource;
  stock: resources.StockResource;
  users: resources.UsersResource;
  voucher: resources.VoucherResource;

  /**
   * @param username Cin7 API connection username.
   * @param apiKey Cin7 API connection key.
   * @param client Optional pre-built client (primarily for testing).
   */
  constructor(username: string, apiKey: string, client?: Cin7Client) {
    this.client = client ?? new Cin7Client(username, apiKey);

    this.adjustments = new resources.AdjustmentsResource(this.client);
    this.bomMasters = new resources.BomMastersResource(this.client);
    this.bomMastersV2 = new resources.BomMastersV2Resource(this.client);
    this.branches = new resources.BranchesResource(this.client);
    this.branchTransfers = new resources.BranchTransfersResource(this.client);
    this.cartons = new resources.CartonsResource(this.client);
    this.contacts = new resources.ContactsResource(this.client);
    this.creditNotes = new resources.CreditNotesResource(this.client);
    this.paymentFeesAndPayouts = new resources.PaymentFeesAndPayoutsResource(
      this.client
    );
    this.payments = new resources.PaymentsResource(this.client);
    this.productCategories = new resources.ProductCategoriesResource(
      this.client
    );
    this.productImages = new resources.ProductImagesResource(this.client);
    this.productionJobs = new resources.ProductionJobsResource(this.client);
    this.productOptions = new resources.ProductOptionsResource(this.client);
    this.products = new resources.ProductsResource(this.client);
    this.purchaseOrders = new resources.PurchaseOrdersResource(this.client);
    this.quotes = new resources.QuotesResource(this.client);
    this.salesOrders = new resources.SalesOrdersResource(this.client);
    this.salesOrdersWithCartons = new resources.SalesOrdersWithCartonsResource(
      this.client
    );
    this.serialNumbers = new resources.SerialNumbersResource(this.client);
    this.sizeRanges = new resources.SizeRangesResource(this.client);
    this.stock = new resources.StockResource(this.client);
    this.users = new resources.UsersResource(this.client);
    this.voucher = new resources.VoucherResource(this.client);
  }
}

export { Cin7 };
export { default as Cin7Client } from "./client";
export * from "./models";
