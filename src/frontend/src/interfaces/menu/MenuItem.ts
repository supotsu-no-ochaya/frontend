import type {NamedEntity} from "@/interfaces/Entities.ts";
import type {Station} from "@/interfaces/misc/Station.ts";
import type {MenuCateg} from "@/interfaces/menu/MenuCateg.ts";

export type MenuItem<T extends BomTemplate> = NamedEntity & {
  disabled: boolean;
  price: number;
  bom_template?: T;
  category: string;
  /**
   * Relation to `station`
   */
  station: string;
  icon?: string;

  expand?: {
    station?: Station;
    category?: MenuCateg;
  }
};

// ================================
// ==== BomTemplate
// ================================
export type BomTemplate =
  | FixedTemplate
  | SelectionTemplate;

export type FixedTemplate = {
  type: "Fixed";
  products: Product[];
};

export type SelectionTemplate = {
  type: "Selection";
  options: Selection[];
};

// ================================
// ==== Selection
// ================================
export type Selection = ProductSelection | TypeSelection;

export type BaseSelection = {
  min_select: number;
  max_select: number;
};

export type ProductSelection = BaseSelection & {
  selection_specification: "ProductSelection";
  products: Product[];
};

export type TypeSelection = BaseSelection & {
  selection_specification: "TypeSelection";
  category_id: string;
};

// ================================
// ==== Product
// ================================
export type Product = {
  id: string;
};
