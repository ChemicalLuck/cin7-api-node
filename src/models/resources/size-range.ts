// Cin7 Omni API — SizeRange
// Source: https://api.cin7.com/api/Help/ResourceModel?modelName=SizeRange

/** A Cin7 size range (`SizeRange` resource model). */
export interface SizeRange {
  Id: number; // The unique Cin7 Id
  SizeRangeName?: string; // The size range name
  Sizes?: string[]; // The sizes in the range
}
