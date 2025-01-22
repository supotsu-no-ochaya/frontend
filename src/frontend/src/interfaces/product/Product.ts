import type {NamedEntity} from "@/interfaces/Entities.ts";
import type {ProductAttribute} from "@/interfaces/product/ProductAttribute.ts";
import type {ProductType} from "@/interfaces/product/ProductType.ts";

export type Product = NamedEntity & {
  is_available: boolean;
  /**
   * Multiple relation to `product_attribute`
   */
  attribute?: string[];
  /**
   * Relation to `product_type`
   */
  type?: string;

  expand?: {
    attribute?: ProductAttribute[];
    type?: ProductType;
  };
};
