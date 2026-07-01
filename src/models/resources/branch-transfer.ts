// Cin7 Omni API — BranchTransfer + BranchTransferItem
// Source: https://api.cin7.com/api/Help/ResourceModel?modelName=BranchTransfer
import type { Size } from "./common";

/** A line item on a {@link BranchTransfer}. */
export interface BranchTransferItem {
  Id?: number; // The unique Cin7 ID
  QtyTransferred?: number; // Quantity Transferred (Read-only)
  UnitCost?: number; // Unit Cost
  Sizes?: Size[]; // Sizes (Read-only)
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

/** A Cin7 stock transfer between branches (`BranchTransfer` resource model). */
export interface BranchTransfer {
  Id: number; // The unique Cin7 Id
  CreatedDate?: string; // Order created date (UTC)
  ModifiedDate?: string; // Order last modified date (UTC)
  CreatedBy?: number; // ID of the User who created the Transaction
  ProcessedBy?: number; // ID of the User who processed the Transaction
  ApprovedBy?: number; // ID of the User who approved the Branch Transfer
  IsApproved?: boolean; // Is Approved (default: true)
  Reference?: string; // A unique reference (max 20)
  BranchEmail?: string; // Branch email
  DeliveryInstructions?: string; // Delivery instructions
  InternalComments?: string; // Internal comment
  ProductTotal?: number; // Product Total
  FirstName?: string; // Contact first name
  LastName?: string; // Contact last name
  Company?: string; // Contact company
  Email?: string; // Contact email address
  Phone?: string; // Contact phone
  Mobile?: string; // Contact mobile
  Fax?: string; // Contact fax
  ProjectName?: string; // Project Name
  TrackingCode?: string; // Shipping tracking code
  Source?: string; // The source of the Transaction
  SourceBranchId?: number; // Source Branch ID
  DestinationBranchId?: number; // Destination Branch ID
  ApprovalDate?: string; // Approval Date (UTC)
  DispatchedDate?: string; // Dispatched Date (UTC)
  ReceivedDate?: string; // Received Date (UTC)
  Stage?: string; // Stage
  CustomFields?: Record<string, unknown>; // Custom Fields
  LineItems?: BranchTransferItem[]; // Collection of BranchTransferItem objects
}

/** Create/update payload for {@link BranchTransfer} (Id is server-assigned on create). */
export type BranchTransferInput = Partial<BranchTransfer>;
