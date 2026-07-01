// Cin7 Omni API — StockUnit (record type returned by GET v1/Stock)
// Source: https://api.cin7.com/api/Help/ResourceModel?modelName=StockUnit
// Note: this model has no documented Id; the natural key is
// ProductId + ProductOptionId + BranchId.

/** A per-branch stock level record (`StockUnit` resource model, from GET v1/Stock). */
export interface StockUnit {
  ProductId?: number; // The unique Cin7 product Id
  ProductOptionId?: number; // The Product Option Id
  ModifiedDate?: string; // Last Transaction Date (UTC)
  StyleCode?: string; // The style code
  Code?: string; // The unique code i.e. SKU
  Barcode?: string; // Barcode i.e. UPC
  BranchId?: number; // The unique Cin7 branch Id
  BranchName?: string; // The branch name
  ProductName?: string; // The product name
  Option1?: string; // Product option 1 (e.g. Red)
  Option2?: string; // Product option 2 (e.g. XL)
  Option3?: string; // Product option 3 (e.g. Cotton)
  Size?: string; // Size
  Available?: number; // Available to Sell (StockOnHand - OpenSales)
  StockOnHand?: number; // The stock on hand (SOH)
  OpenSales?: number; // Open sales quantity
  Incoming?: number; // Inbound purchase order quantity
  Virtual?: number; // Virtual stock for Kit products
  Holding?: number; // Holding stock
}
