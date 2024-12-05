import pb from '@/services/pocketbase';
import type {MenuItem} from '@/interfaces/MenuItem.ts';
import {CrudService} from "@/services/crudService";

export class MenuService extends CrudService<MenuItem> {
  constructor(pb: P) {
    super(pb, 'menu_item');
  }
}

export default menuService = new MenuService(pb);
