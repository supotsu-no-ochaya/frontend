import type {BaseEntity} from "@/interfaces/Entities.ts";
import type {BomTemplate} from "@/interfaces/menu/MenuItem.ts";

// Enum for OrderItem status
export enum OrderStatus {
  Aufgegeben = "Aufgegeben",
  InArbeit = "InArbeit",
  Abholbereit = "Abholbereit",
  Geliefert = "Geliefert",
  Bezahlt = "Bezahlt",
}

export type OrderItem = BaseEntity & {
  order: string;
  price: number;
  bom: BomTemplate;
  status: OrderStatus;
  menu_item: string;
  menu_item_name?: string;
};

