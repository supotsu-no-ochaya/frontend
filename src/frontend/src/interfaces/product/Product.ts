import type {NamedEntity} from "@/interfaces/Entities.ts";

export type Product = NamedEntity & {
  is_available: boolean;
  /**
   * Relation to `station`
   */
  station: string;
  /**
   * Multiple relation to `product_attribute`
   */
  attribute?: string[];
  /**
   * Relation to `product_type`
   */
  type?: string;
};
