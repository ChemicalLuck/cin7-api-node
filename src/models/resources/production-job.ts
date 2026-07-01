// Cin7 Omni API — ProductionJob + ProductionJobProduct + ProductionJobComponent
// Source: https://api.cin7.com/api/Help/ResourceModel?modelName=ProductionJob

/** A component line within a {@link ProductionJobProduct} on a {@link ProductionJob}. */
export interface ProductionJobComponent {
  Id?: number; // The unique Cin7 ID
  ProductId?: number; // Product ID
  ProductOptionId?: number; // Product option ID
  Type?: string; // Component Type: Make, Use, Addon
  Sort?: number; // Sort Order
  Code?: string; // Item Code
  Name?: string; // Item Name
  Option1?: string; // Option 1
  Option2?: string; // Option 2
  Option3?: string; // Option 3
  Notes?: string; // Notes
  Qty?: number; // Standard Qty
  UnitCost?: number; // Unit Cost
}

/** A product being manufactured on a {@link ProductionJob}, with its {@link ProductionJobComponent} list. */
export interface ProductionJobProduct {
  Components?: ProductionJobComponent[]; // Product Components (Read-only)
  Id?: number; // The unique Cin7 ID
  ProductId?: number; // Product ID
  ProductOptionId?: number; // Product option ID
  Type?: string; // Component Type: Make, Use, Addon
  Sort?: number; // Sort Order
  Code?: string; // Item Code
  Name?: string; // Item Name
  Option1?: string; // Option 1
  Option2?: string; // Option 2
  Option3?: string; // Option 3
  Notes?: string; // Notes
  DueDate?: string; // Due Date (UTC)
  StandardQty?: number; // Standard Qty
  ActualQty?: number; // Actual quantity (Read-only)
  UnitCost?: number; // Unit Cost
}

/** A Cin7 production/manufacturing job (`ProductionJob` resource model). */
export interface ProductionJob {
  Id: number; // A unique Job ID
  CreatedDate?: string; // Created date time (UTC)
  ModifiedDate?: string; // Last modified date time (UTC)
  DueDate?: string; // Due Date (UTC)
  CompletedDate?: string; // Completed Date (UTC)
  CreatedBy?: number; // Created by User ID
  CompletedBy?: number; // Completed by User ID
  IsApproved?: boolean; // Is Approved (default: true)
  BranchId?: number; // Branch ID
  Company?: string; // Company
  ProjectName?: string; // Project Name
  ProductionNotes?: string; // Production Notes
  Reference?: string; // The unique Job reference
  Source?: string; // The source
  TotalCost?: number; // Product Total
  CustomFields?: Record<string, unknown>; // Custom Fields
  Products?: ProductionJobProduct[]; // Production Job Products
}

/** Create/update payload for {@link ProductionJob} (Id is server-assigned on create). */
export type ProductionJobInput = Partial<ProductionJob>;
