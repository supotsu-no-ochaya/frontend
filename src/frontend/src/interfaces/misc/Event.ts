import type {BaseEntity} from "@/interfaces/Entities.ts";

export type Event = BaseEntity & {
  type?: 'order' | 'order_item' | 'payment'; // "select" with possible values
  content: any; // "json" field
};
