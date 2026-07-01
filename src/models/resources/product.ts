// Cin7 Omni API — Product + ProductOption + UomOption
// Source: https://api.cin7.com/api/Help/ResourceModel?modelName=Product
import type { Image } from "./common";

/** A unit-of-measure option on a {@link ProductOption}. */
export interface UomOption {
  Id?: number; // The unique Cin7 UOM Option Id
  ProductOptionId?: number; // The unique Cin7 Product Option Id
  Code?: string; // The UOM option code
  Option1?: string; // First product option (e.g. "Box")
  Option2?: string; // Second product option
  Option3?: string; // Third product option
  Quantity?: number; // UOM quantity
  Barcode?: string; // The UOM option barcode
  SupplierCode?: string; // The UOM option Supplier code
  PriceColumns?: Record<string, number>; // Price Columns (key -> price)
}

/** A variant/option of a {@link Product} (e.g. a colour/size combination). */
export interface ProductOption {
  Id: number; // The unique Cin7 Product Option Id
  CreatedDate?: string; // Created Date (UTC)
  ModifiedDate?: string; // Modified Date (UTC)
  Status?: string; // Product Option Status: Primary, Active or Disabled
  ProductId?: number; // The unique Cin7 product id
  Code?: string; // [OBSOLETE] Use ProductOptionCode
  Barcode?: string; // [OBSOLETE] Use ProductOptionBarcode
  ProductOptionCode?: string; // The Product Option Code/SKU
  ProductOptionSizeCode?: string; // The Product Option Size Code/SKU
  ProductOptionBarcode?: string; // The Product Option Barcode
  ProductOptionSizeBarcode?: string; // The Product Option Size Barcode
  SupplierCode?: string; // Supplier code
  Option1?: string; // Product option 1 (e.g. Red)
  Option2?: string; // Product option 2 (e.g. XL)
  Option3?: string; // Product option 3 (e.g. Cotton)
  OptionWeight?: number; // Product Option Weight
  Size?: string; // Size
  SizeId?: number; // Size Id
  RetailPrice?: number; // Retail Price
  WholesalePrice?: number; // Wholesale Price
  VIPPrice?: number; // VIP Price
  SpecialPrice?: number; // Special Price
  SpecialsStartDate?: string; // Specials Start Date
  SpecialDays?: number; // Number of days Specials last
  StockAvailable?: number; // Stock Available
  StockOnHand?: number; // Stock On Hand
  UomOptions?: UomOption[]; // UOM options
  Image?: Image; // A product option image
  PriceColumns?: Record<string, number>; // Price Columns
}

/** A Cin7 product (`Product` resource model). */
export interface Product {
  Id: number; // The unique Cin7 product Id
  Status?: string; // Status: Inactive, Public, ShowInB2B, Internal
  CreatedDate?: string; // Created Date (UTC)
  ModifiedDate?: string; // Modified Date (UTC)
  StyleCode?: string; // The product style code
  Name?: string; // The product name (max 250 chars)
  Description?: string; // The product description
  Tags?: string; // Comma delimited list of custom tags
  Images?: Image[]; // A list of images
  PdfUpload?: string; // PDF file
  PdfDescription?: string; // PDF description
  SupplierId?: number; // The unique Cin7 supplier Id
  Brand?: string; // The product brand name
  Category?: string; // Category
  SubCategory?: string; // Subcategory
  CategoryIdArray?: number[]; // Category IDs assigned to the product
  Channels?: string; // Selling Channels
  Weight?: number; // The product weight
  Height?: number; // The product height
  Width?: number; // The product width
  Length?: number; // The product length
  Volume?: number; // The product volume
  StockControl?: string; // The stock control type
  OrderType?: string; // Order, Kit, Limited Stock, Buy To Order, Pre-order, Gift Voucher
  ProductType?: string; // Product Type
  ProductSubtype?: string; // Product Subtype
  ProjectName?: string; // Project Name
  OptionLabel1?: string; // Label for product option name 1 (e.g. Color)
  OptionLabel2?: string; // Label for product option name 2 (e.g. Size)
  OptionLabel3?: string; // Label for product option name 3 (e.g. Fabric)
  SalesAccount?: string; // Sales account
  PurchasesAccount?: string; // Purchase account
  ImportCustomsDuty?: string; // Import Customs duty
  SizeRangeId?: number; // Size range id
  CustomFields?: Record<string, unknown>; // Custom fields
  ProductOptions?: ProductOption[]; // A list of product options
}

/** Create/update payload for {@link Product} (Id is server-assigned on create). */
export type ProductInput = Partial<Product>;
