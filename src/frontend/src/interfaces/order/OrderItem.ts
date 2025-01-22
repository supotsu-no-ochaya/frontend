import type {BaseEntity} from "@/interfaces/Entities.ts";
import type {Product} from "@/interfaces/product/Product.ts";
import type {BomTemplate, MenuItem} from "@/interfaces/menu/MenuItem.ts";

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
  products: string[];
  status: OrderItemStatus;
  menu_item: string;
  menu_item_name?: string;
  expand?: {
    products?:  Product[];
    menu_item?:  MenuItem<BomTemplate>;
  };
};

