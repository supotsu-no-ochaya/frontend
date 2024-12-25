import pb from '@/services/pocketbase.ts';
import PocketBase from "pocketbase";
import {CrudService} from "@/services/crudService.ts";
import type {Order} from "@/interfaces/order/Order.ts";

export class OrderService extends CrudService<Order> {
  constructor(pb: PocketBase) {
    super(pb, 'order');
  }
}

export const orderService = new OrderService(pb);
