# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0]

### Added

- Initial release of the Cin7 Omni API Node.js client.
- `Cin7` client with HTTP Basic authentication, automatic retries (429 + 5xx,
  honoring `Retry-After`), and transparent page-based pagination.
- Typed resources for all documented Cin7 Omni endpoints: Adjustments,
  BomMasters (v1 + v2), Branches, BranchTransfers, Cartons, Contacts,
  CreditNotes, PaymentFeesAndPayouts, Payments, ProductCategories,
  ProductImages, ProductionJobs, ProductOptions, Products, PurchaseOrders,
  Quotes, SalesOrders, SalesOrdersWithCartons, SerialNumbers, SizeRanges,
  Stock, Users, and Voucher.
- Hand-written TypeScript interfaces for every resource model.
