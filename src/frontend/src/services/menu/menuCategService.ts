import pb from '@/services/pocketbase.ts';
import PocketBase from "pocketbase";
import {CrudService} from "@/services/crudService.ts";
import type {MenuCateg} from "@/interfaces/menu/MenuCateg.ts";

export class MenuCategService extends CrudService<MenuCateg> {
  constructor(pb: PocketBase) {
    super(pb, 'menu_categ');
  }
}

new MenuCategService(pb);
