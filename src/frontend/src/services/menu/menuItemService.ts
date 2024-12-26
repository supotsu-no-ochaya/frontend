import pb from '@/services/pocketbase.ts';
import type {BomTemplate, MenuItem, FixedTemplate, SelectionTemplate} from '@/interfaces/menu/MenuItem.ts';
import PocketBase from "pocketbase";
import {CrudService} from "@/services/crudService.ts";
import {menuCategService} from "@/services/menu/menuCategService.ts";

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
    if (bomTemplate === undefined) {
      return false;
    }
    // TODO: finish me with type checks and db references
    return true
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
