// Cin7 Omni API — ProductOptions endpoint payload alias.
// The ProductOption + UomOption interfaces live in ./product (they are also
// nested under Product), so only the input alias is declared here.
import type { ProductOption } from "./product";

/** Create/update payload for {@link ProductOption}. */
export type ProductOptionInput = Partial<ProductOption>;
