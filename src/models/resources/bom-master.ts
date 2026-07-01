// Cin7 Omni API — BomMaster + BomProduct + BomComponent
// Source: https://api.cin7.com/api/Help/ResourceModel?modelName=BomMaster

/** A component line within a {@link BomProduct} on a {@link BomMaster}. */
export interface BomComponent {
  Id?: number; // The unique Cin7 ID
  ProductId?: number; // Product identifier
  ProductOptionId?: number; // Product option identifier
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

/** The assembled product of a {@link BomMaster}, with its {@link BomComponent} list. */
export interface BomProduct {
  Id?: number; // The unique Cin7 ID
  Components?: BomComponent[]; // Product Components
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

/** A Cin7 bill of materials (`BomMaster` resource model). */
export interface BomMaster {
  Id: number; // A unique ID
  Product?: BomProduct; // Bom product
  CreatedDate?: string; // Created date time (UTC)
  ModifiedDate?: string; // Last modified date time (UTC)
  CreatedBy?: number; // Created by User ID
  ModifiedBy?: number; // Modified by User ID
  ProductionNotes?: string; // Production Notes
  Reference?: string; // The unique reference (max 20)
}
