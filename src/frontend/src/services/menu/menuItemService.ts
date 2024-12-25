import pb from '@/services/pocketbase.ts';
import type {BomTemplate, MenuItem} from '@/interfaces/menu/MenuItem.ts';
import PocketBase from "pocketbase";
import {CrudService} from "@/services/crudService.ts";

export class MenuItemService extends CrudService<MenuItem<BomTemplate>> {
  constructor(pb: PocketBase) {
    super(pb, 'menu_item');
  }

  async getAllMenuItemsWithCategory(): Promise<MenuItem<BomTemplate>[]> {
    return this.getPocketbase().collection(this.getCollectionName()).getFullList()
  }
}
export const menuItemService = new MenuItemService(pb);
