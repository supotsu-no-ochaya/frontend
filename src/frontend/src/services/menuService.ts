import pb from '@/services/pocketbase';
import type {BomTemplate, MenuItem} from '@/interfaces/menu/MenuItem.ts';
import PocketBase from "pocketbase";
import {CrudService} from "@/services/crudService.ts";

export class MenuService extends CrudService<MenuItem<BomTemplate>> {
  constructor(pb: PocketBase) {
    super(pb, 'menu_item');
  }
}

export default new MenuService(pb);
