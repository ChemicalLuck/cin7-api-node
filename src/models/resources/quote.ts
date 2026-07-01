// Cin7 Omni API — Quote + QuoteItem
// Source: https://api.cin7.com/api/Help/ResourceModel?modelName=Quote

/** A line item on a {@link Quote}. */
export interface QuoteItem {
  Id?: number; // The unique Cin7 ID
  CreatedDate?: string; // Created date (UTC)
  TransactionId?: number; // Transaction ID
  ParentId?: number; // Parent Line Item ID (Read-only)
  ProductId?: number; // Product ID (Read-only)
  ProductOptionId?: number; // Product option ID; ProductOptionId or Code links product
  IntegrationRef?: string; // Integration reference
  Sort?: number; // Sort/sequence of line items
  Code?: string; // Product code
  Name?: string; // Item name
  Option1?: string; // Option 1
  Option2?: string; // Option 2
  Option3?: string; // Option 3
  Qty?: number; // Quantity
  StyleCode?: string; // Product style code
  Barcode?: string; // Barcode/UPC
  SizeCodes?: string; // Array of size quantities and codes (Read-only)
  LineComments?: string; // Line item comment
  UnitCost?: number; // Unit Cost
  UnitPrice?: number; // Unit Price
  Discount?: number; // Total line item discount
  QtyShipped?: number; // Qty shipped/dispatched (Read-only)
  HoldingQty?: number; // Holding Quantity (Read-only)
}

/** A Cin7 sales quote (`Quote` resource model). */
export interface Quote {
  Id: number; // The unique Cin7 Id
  CreatedDate?: string; // Created date (UTC)
  ModifiedDate?: string; // Last modified date (UTC)
  CreatedBy?: number; // The ID for the User who created the Transaction
  ProcessedBy?: number; // The ID for the User who processed the Transaction
  IsApproved?: boolean; // Is Approved (default: true)
  Reference?: string; // A unique order reference
  MemberId?: number; // The Customer Id
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
  Total?: number; // Order total (Product, Freight, Discount, Surcharge, Tax)
  CurrencyCode?: string; // The three-character ISO currency code
  CurrencyRate?: number; // The currency rate
  CurrencySymbol?: string; // The currency symbol
  TaxStatus?: string; // Tax Status: Incl, Excl, Exempt
  TaxRate?: number; // Tax Rate (Range: 0-100)
  Source?: string; // Source of the Transaction (Read-only)
  CustomFields?: Record<string, unknown>; // Custom fields
  Probability?: number; // Probability of Winning
  ExpectedOrderDate?: string; // Expected Order Date (UTC)
  AcceptanceDate?: string; // Acceptance Date (UTC)
  LineItems?: QuoteItem[]; // Collection of QuoteItem
  Status?: string; // Status (Read-only)
  Stage?: string; // Stage
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

/** Create/update payload for {@link Quote} (Id is server-assigned on create). */
export type QuoteInput = Partial<Quote>;
