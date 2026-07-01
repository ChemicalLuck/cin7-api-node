// Cin7 Omni API — Branch
// Source: https://api.cin7.com/api/Help/ResourceModel?modelName=Branch
import type { SubContact } from "./common";

/** A physical location (zone + bins) within a branch. */
export interface BranchLocation {
  Zone?: string;
  Bins?: string[];
}

/** A Cin7 branch/warehouse location (`Branch` resource model). */
export interface Branch {
  Id: number; // The unique Cin7 Id
  BranchType?: string; // Branch Type
  StockControlOptions?: string; // Stock control options
  TaxStatus?: string; // Tax Status
  AccountNumber?: string; // Account identifier
  BranchLocations?: BranchLocation[]; // Branch Locations
  CreatedDate?: string; // Created Date (UTC)
  ModifiedDate?: string; // Modified Date (UTC)
  IsActive?: boolean; // Active status indicator
  Company?: string; // Organization name
  FirstName?: string; // Contact's given name
  LastName?: string; // Contact's surname
  JobTitle?: string; // Professional position
  Email?: string; // A unique email address
  Website?: string; // Web presence URL
  Phone?: string; // Telephone number
  Fax?: string; // Facsimile number
  Mobile?: string; // Cellular contact number
  Address1?: string; // Primary street address
  Address2?: string; // Secondary address line
  City?: string; // Municipality
  State?: string; // State/province designation
  PostCode?: string; // Zip/postal code
  Country?: string; // Nation identifier
  PostalAddress1?: string; // Billing/Postal Address 1
  PostalAddress2?: string; // Billing/Postal Address 2
  PostalCity?: string; // Billing/Postal City
  PostalPostCode?: string; // Billing/Postal Post Code
  PostalState?: string; // Billing/Postal State
  PostalCountry?: string; // Billing/Postal Country
  Notes?: string; // Supplementary information
  IntegrationRef?: string; // Integration reference
  CustomFields?: Record<string, unknown>; // Custom fields
  SecondaryContacts?: SubContact[]; // Secondary Contacts
}

/** Create/update payload for {@link Branch} (Id is server-assigned on create). */
export type BranchInput = Partial<Branch>;
