import type {BaseEntity} from "@/interfaces/Entities.ts";

export type Payment = BaseEntity & {
  /**
   * Relation to `order`
   */
  order_items: string[];
  total_amount: number;
  tip_amount?: number;
  discount_percent?: number;
  /**
   * Relation to `payment_option`
   */
  payment_option: string;
};
