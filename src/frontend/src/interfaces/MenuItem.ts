export type MenuItem = {
  id: string;
  name: string;
  price: number;
  bom_template: BomTemplate;
  created: string;
  updated: string;
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

// example use
const handleList = (menuitems: MenuItem[]): void => {
  menuitems.map((e) => {
    if (e.bom_template.type == 'Fixed') {
      let tpl = e.bom_template;
      console.log("FixedTemplate with products:", e.bom_template.products);
    } else {
      let tpl = e.bom_template;
      console.log("SelectionTemplate with options:", e.bom_template.options);
    }
  });
};
