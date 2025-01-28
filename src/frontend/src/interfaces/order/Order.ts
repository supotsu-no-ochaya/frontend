import type {BaseEntity} from "@/interfaces/Entities.ts";
import type {User} from "@/interfaces/user/User.ts";

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
  person: number;
  /**
   * Relation to `users` => store user ID
   */
  waiter: string;
  status: OrderStatus
  expand?: {
    waiter?: User;
  }
};
