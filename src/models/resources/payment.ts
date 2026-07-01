// Cin7 Omni API — Payment
// Source: https://api.cin7.com/api/Help/ResourceModel?modelName=Payment

/** A Cin7 payment against a sales or purchase order (`Payment` resource model). */
export interface Payment {
  Id: number; // The unique Cin7 payment Id
  CreatedDate?: string; // Created Date (UTC)
  ModifiedDate?: string; // Modified Date (UTC)
  PaymentDate?: string; // Payment Date (UTC)
  Amount?: number; // Payment Amount
  Method?: string; // Payment Method
  IsAuthorized?: boolean; // Transaction Authorized
  TransactionRef?: string; // Transaction reference (e.g. gateway transaction Id)
  Comments?: string; // Comments
  OrderId?: number; // The unique Cin7 sales/purchase order Id
  OrderRef?: string; // Unique sales/purchase order reference (Read-only)
  PaymentImportedRef?: string; // Payment imported ref
  BatchReference?: string; // Batch Reference (Read-only)
  ReconcileDate?: string; // Reconcile date (UTC)
  BranchId?: number; // Branch Id
  OrderType?: string; // Order type classification for the associated order
}

/** Create/update payload for {@link Payment} (Id is server-assigned on create). */
export type PaymentInput = Partial<Payment>;

/**
 * A payment-processing fee record from GET v1/PaymentFeesAndPayouts/Fees.
 * Cin7 does not publish a formal model for this endpoint, so it is left open.
 */
export type PaymentFee = Record<string, unknown>;

/**
 * A payout record from GET v1/PaymentFeesAndPayouts/Payouts. Cin7 does not
 * publish a formal model for this endpoint, so it is left open.
 */
export type PaymentPayout = Record<string, unknown>;
