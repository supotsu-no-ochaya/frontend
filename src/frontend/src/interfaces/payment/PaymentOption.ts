import type {NamedEntity} from "@/interfaces/Entities.ts";

export type PaymentOption = NamedEntity & {
  details?: string;
};
