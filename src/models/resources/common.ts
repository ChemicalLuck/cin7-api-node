// Cin7 Omni API — shared sub-types referenced by multiple resource models.
// All field names are preserved exactly as documented (PascalCase). Dates are
// UTC strings (`yyyy-MM-ddTHH:mm:ssZ`).

/** Accounting-integration attributes attached to transaction models. */
export type AccountingAttributes = Record<string, unknown>;

/** An image reference (products, product options, categories). */
export interface Image {
  Link?: string; // A link to an image
}

/** A batch/serial stock movement entry on a sales order line item. */
export interface StockMovement {
  Batch?: string;
  Quantity?: number;
  Serial?: string;
}

/** A size breakdown row on a branch-transfer line item (read-only). */
export interface Size {
  Size?: string;
  Code?: string;
  Barcode?: string;
  Qty?: number;
}

/** A secondary contact attached to a Contact or Branch. */
export interface SubContact {
  Id?: number; // The unique Cin7 Id
  Company?: string; // Company name
  FirstName?: string; // First Name
  LastName?: string; // Last Name
  JobTitle?: string; // Job Title
  Email?: string; // Email
  Mobile?: string; // Mobile
  Phone?: string; // Phone
}
