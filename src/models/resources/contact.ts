// Cin7 Omni API — Contact
// Source: https://api.cin7.com/api/Help/ResourceModel?modelName=Contact
import type { SubContact } from "./common";

/** Accounting-system integration identifiers for a contact (read-only). */
export interface AccountingIntegrationId {
  Xero?: string;
  QuickBooksOnline?: string;
  QuickBooksDesktop?: string;
}

/** A Cin7 CRM contact — customer or supplier (`Contact` resource model). */
export interface Contact {
  Id: number; // The unique Cin7 Id
  Type?: string; // Contact Type: Customer, Supplier
  SalesPersonId?: number; // The User Id
  AccountNumber?: string; // Account Number
  BillingId?: number; // Parent company member id
  BillingCompany?: string; // Billing Company
  AccountsFirstName?: string; // Accounts contact first name
  AccountsLastName?: string; // Accounts contact last name
  BillingEmail?: string; // Billing Email
  AccountsPhone?: string; // Accounts contact phone
  BillingCostCenter?: string; // Alternative GL account of a Parent company
  CostCenter?: string; // Alternative GL account
  PriceColumn?: string; // A price column name
  PercentageOff?: number; // Percentage Off Price Tier
  PaymentTerms?: string; // Payment terms
  TaxStatus?: string; // Tax Status
  TaxNumber?: string; // Tax Number
  CreditLimit?: number; // Credit Limit
  BalanceOwing?: number; // Balance Owing
  OnHold?: boolean; // Hold Status
  Group?: string; // Group
  SubGroup?: string; // Subgroup
  Stages?: string; // Stages
  AccountingIntegrationId?: AccountingIntegrationId; // Accounting Integration Ids (read-only)
  CreatedDate?: string; // Created Date (UTC)
  ModifiedDate?: string; // Modified Date (UTC)
  IsActive?: boolean; // Is Active
  Company?: string; // Company
  FirstName?: string; // First Name
  LastName?: string; // Last Name
  JobTitle?: string; // Job Title
  Email?: string; // A unique email address
  Website?: string; // Website
  Phone?: string; // Phone
  Fax?: string; // Fax
  Mobile?: string; // Mobile
  Address1?: string; // Address 1
  Address2?: string; // Address 2
  City?: string; // City
  State?: string; // State
  PostCode?: string; // Post Code
  Country?: string; // Country
  PostalAddress1?: string; // Billing/Postal Address 1
  PostalAddress2?: string; // Billing/Postal Address 2
  PostalCity?: string; // Billing/Postal City
  PostalPostCode?: string; // Billing/Postal Post Code
  PostalState?: string; // Billing/Postal State
  PostalCountry?: string; // Billing/Postal Country
  Notes?: string; // Notes
  IntegrationRef?: string; // Integration reference
  CustomFields?: Record<string, unknown>; // Custom fields
  SecondaryContacts?: SubContact[]; // Secondary Contacts
}

/** Create/update payload for {@link Contact} (Id is server-assigned on create). */
export type ContactInput = Partial<Contact>;
