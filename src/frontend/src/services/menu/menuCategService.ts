import pb from '@/services/pocketbase.ts';
import PocketBase from "pocketbase";
import type { MenuCateg } from "@/interfaces/menu/MenuCateg.ts"; // e.g., if you have a type for menu_categ
import { CrudService } from "@/services/crudService.ts";

export class MenuCategService extends CrudService<MenuCateg> {
  constructor(pb: PocketBase) {
    super(pb, "menu_categ");
  }

  async getByName(name: string): Promise<MenuCateg | null> {
    const records = await this.getPocketbase()
      .collection(this.getCollectionName())
      .getFullList<MenuCateg>({
        filter: `name = "${name}"`,
        limit: 1,
      });

    return records.length > 0 ? records[0] : null;
  }
}

export const menuCategService = new MenuCategService(pb);
