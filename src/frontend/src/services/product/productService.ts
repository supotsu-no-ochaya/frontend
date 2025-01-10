import pb from '@/services/pocketbase.ts';
import PocketBase from "pocketbase";
import {CrudService} from "@/services/crudService.ts";
import type {Product} from "@/interfaces/product/Product.ts";

export class ProductService extends CrudService<Product> {
  constructor(pb: PocketBase) {
    super(pb, 'product');
  }
}

export const productService = new ProductService(pb);
