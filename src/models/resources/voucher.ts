// Cin7 Omni API — Voucher
// Source: https://api.cin7.com/api/Help/ResourceModel?modelName=Voucher
// Note: vouchers are keyed by Code; the docs do not list an Id field.

/** A Cin7 gift voucher / promotional voucher (`Voucher` resource model, keyed by Code). */
export interface Voucher {
  CreatedDate?: string; // Voucher Created Date (UTC)
  Status?: string; // Active: has balance; Inactive: fully redeemed
  Code?: string; // Voucher Code
  Type?: string; // Voucher Type
  Description?: string; // Promotion Description
  ExpiryDate?: string; // Voucher Expiry Date (UTC)
  Amount?: number; // Voucher Amount
  CustomerID?: number; // Customer ID the voucher is assigned to
  CustomerEmail?: string; // Customer Email the voucher is assigned to
  RedeemedCount?: number; // How many times the voucher has been redeemed
  RedeemedCountLimit?: number; // Limit on how many times it can be redeemed
  RedeemedAmount?: number; // Voucher Redeemed Amount
}
