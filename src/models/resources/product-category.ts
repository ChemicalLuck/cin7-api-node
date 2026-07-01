// Cin7 Omni API — ProductCategory
// Source: https://api.cin7.com/api/Help/ResourceModel?modelName=ProductCategory
import type { Image } from "./common";

/** A Cin7 product category (`ProductCategory` resource model). */
export interface ProductCategory {
  Id: number; // The unique Cin7 Id
  ParentId?: number; // Parent category Id
  IsActive?: boolean; // Active status
  Sort?: number; // Sort order
  Name?: string; // Category name
  Description?: string; // Category description
  Image?: Image; // Category image
}

/** Create/update payload for {@link ProductCategory} (Id is server-assigned on create). */
export type ProductCategoryInput = Partial<ProductCategory>;
