import type {BaseEntity} from "@/interfaces/Entities.ts";
import type {PaymentOption} from "@/interfaces/payment/PaymentOption.ts";
import type {OrderItem} from "@/interfaces/order/OrderItem.ts";

export type Payment = BaseEntity & {
  /**
   * Relation to `order`
   */
  order_items: string[];
  person: number;
  total_amount: number;
  tip_amount?: number;
  discount_percent?: number;
  /**
   * Relation to `payment_option`
   */
  payment_option: string;

  expand?: {
    payment_option?: PaymentOption;
    order_items?: OrderItem[];
  }
};
