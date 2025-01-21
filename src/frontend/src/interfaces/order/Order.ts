import type {BaseEntity} from "@/interfaces/Entities.ts";

// Enum for Order status
export enum OrderStatus {
  Aufgegeben = "Aufgegeben",
  InArbeit = "InArbeit",
  Abholbereit = "Abholbereit",
  Geliefert = "Geliefert",
  Bezahlt = "Bezahlt"
}

export type Order = BaseEntity & {
  table: number;
  /**
   * Relation to `users` => store user ID
   */
  waiter: string;
  status: OrderStatus
};
