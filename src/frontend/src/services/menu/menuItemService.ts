import pb from '@/services/pocketbase.ts';
import type {BomTemplate, MenuItem} from '@/interfaces/menu/MenuItem.ts';
import PocketBase from "pocketbase";
import {CrudService} from "@/services/crudService.ts";
import {menuCategService} from "@/services/menu/menuCategService.ts";
import {productService} from "@/services/product/productService.ts";

export class MenuItemService extends CrudService<MenuItem<BomTemplate>> {
  constructor(pb: PocketBase) {
    super(pb, "menu_item");
  }

  async getAllMenuItemsWithCategory(categoryName: string): Promise<MenuItem<BomTemplate>[]> {
    // look up the category by name
    const category = await menuCategService.getByName(categoryName);

    if (!category) {
      // Category not found => return empty array or throw an error
      return [];
    }

    // filter menu items by that category ID
    return this.getPocketbase()
      .collection(this.getCollectionName())
      .getFullList<MenuItem<BomTemplate>>({
        filter: `category = "${category.id}"`,
      });
  }

  async getAllMenuItemsWithCategoryID(categoryID: string): Promise<MenuItem<BomTemplate>[]> {
    return this.getPocketbase()
      .collection(this.getCollectionName())
      .getFullList<MenuItem<BomTemplate>>({
        filter: `category = "${categoryID}"`,
      });
  }

  async IsValidBomTemplate(bomTemplate: BomTemplate): Promise<boolean> {
    if (!bomTemplate) return false;

    const MAX_SELECT_LIMIT = 20;

    try {
      if (bomTemplate.type === "Fixed") {
        // Validate products for Fixed type
        for (const product of bomTemplate.products) {
          if (!(await productService.exists(product.id))) {
            return false;
          }
        }
        return true;
      }

      // Validation for Selection type
      if (!bomTemplate.options) return false;

      for (const selection of bomTemplate.options) {
        // Validate selection limits
        if (
          selection.min_select > selection.max_select ||
          selection.min_select < 1 ||
          selection.max_select > MAX_SELECT_LIMIT
        ) {
          return false;
        }

        // Validate based on selection specification
        if (selection.selection_specification === "ProductSelection") {
          for (const product of selection.products) {
            if (!(await productService.exists(product.id))) {
              return false;
            }
          }
        } else {
          if (!(await menuCategService.exists(selection.category_id))) {
            return false;
          }
        }
      }

      return true;
    } catch (error) {
      console.error("Error validating BOM template:", error);
      return false;
    }
  }


  async create(data: Partial<MenuItem<BomTemplate>>): Promise<MenuItem<BomTemplate>> {
    if (data.price === undefined || data.price < 0) {
      throw new Error("Enter a valid price!")
    }
    if (data.bom_template === undefined || !await this.IsValidBomTemplate(data.bom_template)) {
      throw new Error("Bom template is invalid!")
    }
    return super.create(data)
  }


}
export const menuItemService = new MenuItemService(pb);
