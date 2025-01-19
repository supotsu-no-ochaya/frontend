import type {BaseEntity} from "@/interfaces/Entities.ts";
import type {BomTemplate} from "@/interfaces/menu/MenuItem.ts";

// Enum for OrderItem status
export enum OrderStatus {
  Aufgegeben = "Aufgegeben",
  InArbeit = "InArbeit",
  Abholbereit = "Abholbereit",
  Geliefert = "Geliefert",
}

export type OrderItem = BaseEntity & {
  order: string;
  price: number;
  bom: Bom;
  status: OrderStatus;
  menu_item: string;
  menu_item_name?: string;
  notes: string
};

export type Bom = {
  products: String[];
}