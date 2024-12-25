import pb from '@/services/pocketbase.ts';
import PocketBase from "pocketbase";
import {CrudService} from "@/services/crudService.ts";
import type {Payment} from "@/interfaces/payment/Payment.ts";

export class PaymentService extends CrudService<Payment> {
  constructor(pb: PocketBase) {
    super(pb, 'payment');
  }
}

new PaymentService(pb);
