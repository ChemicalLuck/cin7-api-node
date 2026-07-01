// Cin7 Omni API — Carton + CartonLineItem
// Source: https://api.cin7.com/api/Help/ResourceModel?modelName=Carton

/** A line item within a {@link Carton}. */
export interface CartonLineItem {
  LineItemId?: number; // Cin7 Sales Order Line Item ID
  ProductCode?: string; // Product Code/SKU (used to match LineItemId if none supplied)
  BatchNumber?: string; // Batch Number
  Quantity?: number; // Quantity
}

/** A Cin7 shipping carton (`Carton` resource model). */
export interface Carton {
  Id: number; // The unique Cin7 Id
  Number?: string; // Carton Number (numbers only)
  SSCC?: string; // SSCC Number (numbers only)
  Length?: number; // Length measurement
  Depth?: number; // Depth measurement
  Height?: number; // Height measurement
  Volume?: number; // Volume measurement
  Weight?: number; // Weight measurement
  TrackingNumber?: string; // Tracking Number
  CartonItems?: CartonLineItem[]; // Carton Items
}

/** Create/update payload for {@link Carton} (Id is server-assigned on create). */
export type CartonInput = Partial<Carton>;
