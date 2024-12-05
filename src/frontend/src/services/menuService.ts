import pb from '@/services/pocketbase';
import type {BomTemplate, MenuItem} from '@/interfaces/MenuItem.ts';
import {CrudService} from "@/services/crudService";

export class MenuService extends CrudService<MenuItem<BomTemplate>> {
  constructor(pb: P) {
    super(pb, 'menu_item');
  }
}

export default menuService = new MenuService(pb);
