import type {BaseEntity} from "@/interfaces/Entities.ts";
import type {BomTemplate} from "@/interfaces/menu/MenuItem.ts";

// Enum for OrderItem status
export enum OrderItemStatus {
  Aufgegeben = "Aufgegeben",
  InArbeit = "InArbeit",
  Abholbereit = "Abholbereit",
  Geliefert = "Geliefert",
}

export type OrderItem = BaseEntity & {
  order: string;
  price: number;
  bom: BomTemplate;
  status: OrderItemStatus;
  menu_item: string;
  menu_item_name?: string;
};

