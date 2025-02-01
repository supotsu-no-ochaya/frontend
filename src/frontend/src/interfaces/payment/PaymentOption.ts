import type {NamedEntity} from "@/interfaces/Entities.ts";

export enum paymentOption {
  cash = "Bar",
  card = "Karte"
}

export type PaymentOption = NamedEntity & {
  details?: paymentOption,
};
