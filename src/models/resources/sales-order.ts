// Cin7 Omni API — SalesOrder + SalesOrderItem
// Source: https://api.cin7.com/api/Help/ResourceModel?modelName=SalesOrder
import type { AccountingAttributes, StockMovement } from "./common";

/** A line item on a {@link SalesOrder}. */
export interface SalesOrderItem {
  Id?: number; // Unique Cin7 ID
  CreatedDate?: string; // Created date (UTC)
  TransactionId?: number; // Transaction ID (Sales Order, Quote, or Purchase Order)
  ParentId?: number; // Parent line item ID (Read-only)
  ProductId?: number; // Product ID (Read-only)
  ProductOptionId?: number; // Product option ID for linking products
  IntegrationRef?: string; // Integration reference
  Sort?: number; // Sort/sequence of line items
  Code?: string; // Product code
  Name?: string; // Item name
  Option1?: string; // Option 1 value
  Option2?: string; // Option 2 value
  Option3?: string; // Option 3 value
  Qty?: number; // Quantity ordered
  StyleCode?: string; // Product style code
  Barcode?: string; // Barcode/UPC identifier for the product
  SizeCodes?: string; // Array of size quantities, codes, and barcodes (Read-only)
  LineComments?: string; // Line item comment
  UnitCost?: number; // Unit cost value
  UnitPrice?: number; // Unit price value
  UomPrice?: number; // Unit of measure price for the product
  Discount?: number; // Total line item discount amount
  UomQtyOrdered?: number; // Quantity ordered in unit of measure
  UomQtyShipped?: number; // Quantity shipped in unit of measure (Read-only)
  UomSize?: number; // Unit of measure size (Read-only)
  QtyShipped?: number; // Quantity shipped/dispatched (Read-only)
  HoldingQty?: number; // Holding quantity (Read-only)
  AccountCode?: string; // Alternative GL account code
  StockControl?: string; // Stock control reference
  StockMovements?: StockMovement[]; // Dispatch quantities (Read-only)
}

/** A Cin7 sales order (`SalesOrder` resource model). */
export interface SalesOrder {
  Id: number; // The unique Cin7 Id
  CreatedDate?: string; // Created date (UTC)
  ModifiedDate?: string; // Last modified date (UTC)
  CreatedBy?: number; // The ID for the User who created the Transaction
  ProcessedBy?: number; // The ID for the User who processed the Transaction
  IsApproved?: boolean; // Is Approved (default: true)
  Reference?: string; // A unique order reference (leave blank to auto-generate on insert)
  MemberId?: number; // The Customer Id (Optional)
  FirstName?: string; // Contact first name
  LastName?: string; // Contact last name
  Company?: string; // Contact company
  Email?: string; // Contact email address
  Phone?: string; // Contact phone
  Mobile?: string; // Contact mobile
  Fax?: string; // Contact fax
  DeliveryFirstName?: string; // Delivery recipient first name
  DeliveryLastName?: string; // Delivery recipient last name
  DeliveryCompany?: string; // Delivery recipient company name
  DeliveryAddress1?: string; // Delivery address 1
  DeliveryAddress2?: string; // Delivery address 2
  DeliveryCity?: string; // Delivery address city
  DeliveryState?: string; // Delivery address state
  DeliveryPostalCode?: string; // Delivery address postcode
  DeliveryCountry?: string; // Delivery address country
  BillingFirstName?: string; // Billing recipient first name
  BillingLastName?: string; // Billing recipient last name
  BillingCompany?: string; // The billing company name
  BillingAddress1?: string; // Billing address 1
  BillingAddress2?: string; // Billing address 2
  BillingCity?: string; // Billing address city
  BillingPostalCode?: string; // Billing address postcode
  BillingState?: string; // Billing address state
  BillingCountry?: string; // Billing address country
  BranchId?: number; // Branch Id (defaults to Main Branch)
  BranchEmail?: string; // Branch email
  ProjectName?: string; // Project Name
  TrackingCode?: string; // Shipping tracking code
  InternalComments?: string; // Internal comment
  ProductTotal?: number; // Product Total only
  FreightTotal?: number; // Total cost of delivery charges
  FreightDescription?: string; // Freight/carrier description
  Surcharge?: number; // Surcharge
  SurchargeDescription?: string; // Surcharge description
  DiscountTotal?: number; // Total overall discount
  DiscountDescription?: string; // The discount description
  Total?: number; // Order total incl. Product, Freight, Discount, Surcharge, and Tax
  CurrencyCode?: string; // Three-character ISO currency code (omit for account default)
  CurrencyRate?: number; // Currency rate (auto-looked up if omitted)
  CurrencySymbol?: string; // Currency symbol (auto-populated)
  TaxStatus?: string; // Tax Status: Incl, Excl, Exempt
  TaxRate?: number; // Tax Rate e.g. 15
  Source?: string; // Source of the Transaction (Read-only)
  CustomFields?: Record<string, unknown>; // Custom fields
  InvoiceDate?: string; // Invoice date (UTC)
  InvoiceNumber?: number; // Invoice number (Read-only)
  DispatchedDate?: string; // Date when order was fully dispatched (UTC)
  LogisticsCarrier?: string; // Logistics Carrier
  LogisticsStatus?: number; // Logistics Status
  EdiStatus?: number; // Edi Status
  DistributionBranchId?: number; // Distribution Branch
  DepartmentNumber?: string; // Department Number
  StoreLocationNumber?: string; // Store Location Number
  DistributionCenter?: string; // Distribution Center
  LineItems?: SalesOrderItem[]; // Line Items
  IsVoid?: boolean; // Set true to void an order (irreversible)
  AccountingAttributes?: AccountingAttributes; // For the Accounting Integration
  Status?: string; // Status (Read-only)
  Stage?: string; // Stage: New, Awaiting Payment, Declined, Dispatched, Processing, On Hold
  MemberEmail?: string; // The CRM contact email of a customer in an order
  MemberCostCenter?: string; // Member Cost Center (Alternative GL Account)
  MemberAlternativeTaxRate?: string; // The member Alternative Tax Rate
  CostCenter?: string; // Cost Center (Alternative GL Account)
  AlternativeTaxRate?: string; // Alternative Tax Rate
  EstimatedDeliveryDate?: string; // Estimated Delivery Date (UTC)
  SalesPersonId?: number; // The unique Cin7 user Id of the sales person
  SalesPersonEmail?: string; // Obsolete; null in response
  PaymentTerms?: string; // Payment terms
  CustomerOrderNo?: string; // Customer purchase order reference
  VoucherCode?: string; // Voucher code
  DeliveryInstructions?: string; // Delivery instructions
  CancellationDate?: string; // Order cancellation date (Read-only, UTC)
  ModifiedCOGSDate?: string; // Last modified date of COGS (Read-only, UTC)
}

/** Payload accepted by create/update on SalesOrders (Id server-assigned on create). */
export type SalesOrderInput = Partial<SalesOrder>;
