import pb from '@/services/pocketbase.ts';
import PocketBase from "pocketbase";
import {CrudService} from "@/services/crudService.ts";
import type {PaymentOption} from "@/interfaces/payment/PaymentOption.ts";

export class PaymentOptionService extends CrudService<PaymentOption> {
  constructor(pb: PocketBase) {
    super(pb, 'payment_option');
  }
}

new PaymentOptionService(pb);
