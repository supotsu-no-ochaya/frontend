import pb from '@/services/pocketbase.ts';
import PocketBase from "pocketbase";
import {CrudService} from "@/services/crudService.ts";
import type {OrderItem} from "@/interfaces/order/OrderItem.ts";

export class OrderItemService extends CrudService<OrderItem> {
  constructor(pb: PocketBase) {
    super(pb, 'order_item');
  }
}

export const orderItemService = new OrderItemService(pb);
