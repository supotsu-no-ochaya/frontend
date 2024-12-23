import type {BaseEntity} from "@/interfaces/Entities.ts";

export type OrderItem = BaseEntity & {
  order: string;
  price: number;
  bom: any; // "json" field
  status: 'Aufgegeben' | 'InArbeit' | 'Abholbereit' | 'Geliefert';
  menu_item: string;  // relation to `menu_item`
  menu_item_name?: string;
};
