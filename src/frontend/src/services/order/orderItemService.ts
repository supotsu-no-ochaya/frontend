import pb from '@/services/pocketbase.ts';
import PocketBase from "pocketbase";
import {CrudService} from "@/services/crudService.ts";
import {type OrderItem, OrderItemStatus} from "@/interfaces/order/OrderItem.ts";

export class OrderItemService extends CrudService<OrderItem> {
  constructor(pb: PocketBase) {
    super(pb, 'order_item');
  }

  async updateOrderItemToStatus(orderItemId: string, orderItemStatus: OrderItemStatus): Promise<OrderItem> {
    if (!orderItemId) {
      throw new Error("OrderItem must have a valid ID to update.");
    }

    if (!orderItemStatus) {
      throw new Error("OrderItem must include a status to update.");
    }

    // Validate the provided status
    if (!Object.values(OrderItemStatus).includes(orderItemStatus)) {
      throw new Error(`Invalid status: ${orderItemStatus}. Valid statuses are: ${Object.values(OrderItemStatus).join(", ")}`);
    }

    // Define the valid order item status progression
    const statusOrder = [
      OrderItemStatus.Aufgegeben,
      OrderItemStatus.InArbeit,
      OrderItemStatus.Abholbereit,
      OrderItemStatus.Geliefert
    ];

    try {
      const currentOrderItem: OrderItem = await super.getById(orderItemId);

      const currentIndex = statusOrder.indexOf(currentOrderItem.status);
      const newIndex = statusOrder.indexOf(orderItemStatus);

      // Ensure the new status is ahead of the current one
      if (newIndex <= currentIndex) {
        throw new Error(
          `Invalid status update. "${orderItemStatus}" must be ahead of "${currentOrderItem.status}".`
        );
      }

      const updatedOrderItem: OrderItem = {
        ...currentOrderItem,
        status: orderItemStatus, // Set the new status
      };

      await super.update(orderItemId, updatedOrderItem);

      return updatedOrderItem;
    } catch (error) {
      console.error("Error updating OrderItem status:", error);
      throw new Error("Failed to update the OrderItem status.");
    }
  }
}

export const orderItemService = new OrderItemService(pb);
