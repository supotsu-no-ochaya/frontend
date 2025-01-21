import type {BaseEntity} from "@/interfaces/Entities.ts";
import type {BomTemplate} from "@/interfaces/menu/MenuItem.ts";

// Enum for OrderItem status
export enum OrderItemStatus {
  Aufgegeben = "Aufgegeben",
  InArbeit = "InArbeit",
  Abholbereit = "Abholbereit",
  Geliefert = "Geliefert",
  Bezahlt = "Bezahlt",
}

export type OrderItem = BaseEntity & {
  order: string;
  price: number;
  products: String[];
  status: OrderItemStatus;
  menu_item: string;
  menu_item_name?: string;
  notes: string
};

export type Bom = {
  products: String[];
}