import pb from '@/services/pocketbase.ts';
import PocketBase from "pocketbase";
import {CrudService} from "@/services/crudService.ts";
import type {Order} from "@/interfaces/order/Order.ts";
import {OrderStatus} from "@/interfaces/order/Order.ts";

export class OrderService extends CrudService<Order> {
  constructor(pb: PocketBase) {
    super(pb, 'order');
  }

  async updateOrderToStatus(orderId: string, orderStatus: OrderStatus): Promise<Order> {
    if (!orderId) {
      throw new Error("Order must have a valid ID to update.");
    }

    if (!orderStatus) {
      throw new Error("Order must include a status to update.");
    }

    // Validate the provided status
    if (!Object.values(OrderStatus).includes(orderStatus)) {
      throw new Error(`Invalid status: ${orderStatus}. Valid statuses are: ${Object.values(OrderStatus).join(", ")}`);
    }

    // Define the valid order status progression
    const statusOrder = [
      OrderStatus.Aufgegeben,
      OrderStatus.InArbeit,
      OrderStatus.Abholbereit,
      OrderStatus.Geliefert,
      OrderStatus.Bezahlt
    ];

    try {
      const currentOrder: Order = await super.getById(orderId);

      const currentIndex = statusOrder.indexOf(currentOrder.status);
      const newIndex = statusOrder.indexOf(orderStatus);

      // Ensure the new status is ahead of the current one
      // if (newIndex <= currentIndex) {
      //   throw new Error(
      //     `Invalid status update. "${orderStatus}" must be ahead of "${currentOrder.status}".`
      //   );
      // }

      const updatedOrder: Order = {
        ...currentOrder,
        status: orderStatus, // Set the new status
      };

      await super.update(orderId, updatedOrder);

      return updatedOrder;
    } catch (error) {
      console.error("Error updating Order status:", error);
      throw new Error("Failed to update the Order status.");
    }
  }
}

export const orderService = new OrderService(pb);
