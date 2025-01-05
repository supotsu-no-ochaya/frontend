import pb from '@/services/pocketbase.ts';
import PocketBase from "pocketbase";
import {CrudService} from "@/services/crudService.ts";
import {type OrderItem, OrderStatus} from "@/interfaces/order/OrderItem.ts";

export class OrderItemService extends CrudService<OrderItem> {
  constructor(pb: PocketBase) {
    super(pb, 'order_item');
  }

  async updateOrderItemToStatus(orderItemId: string, orderItemStatus: OrderStatus): Promise<OrderItem> {
    if (!orderItemId) {
      throw new Error("OrderItem must have a valid ID to update.");
    }

    if (!orderItemStatus) {
      throw new Error("OrderItem must include a status to update.");
    }

    // Validate the provided status
    if (!Object.values(OrderStatus).includes(orderItemStatus)) {
      throw new Error(`Invalid status: ${orderItemStatus}. Valid statuses are: ${Object.values(OrderStatus).join(", ")}`);
    }

    try {
      const currentOrderItem: OrderItem = await super.getById(orderItemId);

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
