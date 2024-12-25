import pb from '@/services/pocketbase.ts';
import PocketBase from "pocketbase";
import {CrudService} from "@/services/crudService.ts";
import type {ProductAttribute} from "@/interfaces/product/ProductAttribute.ts";

export class ProductAttributeService extends CrudService<ProductAttribute> {
  constructor(pb: PocketBase) {
    super(pb, 'product_type');
  }
}

new ProductAttributeService(pb);
