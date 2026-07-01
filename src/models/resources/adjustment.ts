// Cin7 Omni API — Adjustment + AdjustmentItem
// Source: https://api.cin7.com/api/Help/ResourceModel?modelName=Adjustment

/** A line item on an {@link Adjustment}. */
export interface AdjustmentItem {
  Id?: number; // The unique Cin7 ID
  QtyAdjusted?: number; // Quantity Adjusted
  HoldingQty?: number; // Holding Quantity
  Account?: string; // GL Account Code
  UnitCost?: number; // Unit Cost
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
}

/** A Cin7 stock adjustment (`Adjustment` resource model). */
export interface Adjustment {
  Id: number; // The unique Cin7 Id
  CreatedDate?: string; // Order created date (UTC)
  ModifiedDate?: string; // Order last modified date (UTC)
  CreatedBy?: number; // ID of the User who created the Transaction
  ProcessedBy?: number; // ID of the User who processed the Transaction
  IsApproved?: boolean; // Is Approved (default: true)
  Reference?: string; // Unique order reference (max 20)
  BranchId?: number; // Branch ID
  CompletedDate?: string; // Completed Date (UTC)
  AdjustInAccountingSystem?: string; // Date to adjust in Accounting system (UTC)
  AdjustmentReason?: string; // The reason for adjusting Stock
  AlternativeAccountCode?: string; // Alternative GL Account
  ProductTotal?: number; // Product Total
  Source?: string; // The source of the Transaction
  LineItems?: AdjustmentItem[]; // Line Items
}

/** Create/update payload for {@link Adjustment} (Id is server-assigned on create). */
export type AdjustmentInput = Partial<Adjustment>;
