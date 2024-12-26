import type {NamedEntity} from "@/interfaces/Entities.ts";

export type MenuItem<T extends BomTemplate> = NamedEntity & {
  price: number;
  bom_template: T;
  category: string;
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
export type Selection = ProductSelection | CategorySelection;

export type BaseSelection = {
  min_select: number;
  max_select: number;
};

export type ProductSelection = BaseSelection & {
  selection_type: "ProductSelection";
  products: Product[];
};

export type CategorySelection = BaseSelection & {
  selection_type: "CategorySelection";
  category_id: string;
};

// ================================
// ==== Product
// ================================
export type Product = {
  id: string;
};

const handleList = (menuitems: MenuItem<BomTemplate>[]): void => {
  menuitems.map((e) => {
    if (e.bom_template.type == 'Fixed') {
      let item = e as MenuItem<FixedTemplate>;
      let tpl = e.bom_template;
      console.log("FixedTemplate with products:", e.bom_template.products);
    } else {
      let item = e as MenuItem<SelectionTemplate>;
      let tpl = e.bom_template;
      console.log("SelectionTemplate with options:", e.bom_template.options);
    }
  });
};
