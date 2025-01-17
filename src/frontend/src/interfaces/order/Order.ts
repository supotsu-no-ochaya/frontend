import type {BaseEntity} from "@/interfaces/Entities.ts";

export type Order = BaseEntity & {
  table: number;
  /**
   * Relation to `users` => store user ID
   */
  waiter: string;
  status:
    | 'Aufgegeben'
    | 'InArbeit'
    | 'Abholbereit'
    | 'Geliefert'
    | 'Bezahlt';
};
