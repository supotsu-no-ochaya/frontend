import type {NamedEntity} from "@/interfaces/Entities.ts";

export type MenuCateg = NamedEntity & {
  parent_categ?: string;
};