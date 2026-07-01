// Cin7 Omni API — SerialNumber
// Source: https://api.cin7.com/api/Help/ResourceModel?modelName=SerialNumber

/** A Cin7 stock serial number (`SerialNumber` resource model). */
export interface SerialNumber {
  Id: number; // The unique Cin7 Id
  Serialnumber?: string; // Serial number (Cin7 spells this "Serialnumber")
  ProductId?: number; // The unique Cin7 product Id
  ProductOptionId?: number; // The unique product option Id
  LineItemId?: number; // The ID for the respective line item
  Code?: string; // The unique Cin7 price option code
  HoldingGroup?: string; // Holding Group
  BranchId?: number; // The unique Cin7 member Id of the branch
  Available?: number; // Available
}
