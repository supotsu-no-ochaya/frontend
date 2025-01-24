<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { DefaultLayout } from "@/layouts/default";
import { useCartStore } from "@/components/cart.js";
import { Table, TableCell, TableBody, TableRow} from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import { reactive, ref, computed } from 'vue';
import WaiterControlHeader from "@/components/waiter/WaiterControlHeader.vue";

import { orderService } from "@/services/order/orderService.ts";
import { orderItemService } from "@/services/order/orderItemService.ts";

const router = useRouter();
const route = useRoute("/waiter/table/[tableId]/order");
const tableId = computed(() => route.params.tableId);

const cartStore = reactive(useCartStore());

import { authService } from "@/services/user/authService.ts";
import { OrderStatus } from "@/interfaces/order/Order";

const addToCart = (product,table, person) => {
  cartStore.addToCart(product,table, person);
};

const subFromCart = (product,table, person) => {
  cartStore.subFromCart(product,table, person);
};

const removeFromCart = (product,table, person) => {
  cartStore.removeFromCart(product,table, person);
};

const clearCart = () => {
  cartStore.clearCart();
}

let persons = []
for (let orderItem of cartStore.cart){
  if (persons.includes(orderItem.person) == false){
    persons.push(orderItem.person)
  }
}

async function handleOrderSend(person,table){
  if (cartStore.cart.filter(item => item.person === person && item.table === table).length > 0){
    const waiter = authService.getCurrentUser()
    const order = await orderService.create({table: tableId.value, waiter: waiter.id, status:'Aufgegeben'})


    let _orderItem = undefined;
    for (let orderItem of (cartStore.cart.filter(item => item.person === person && item.table === table))){
      console.log(orderItem.notes)

      let count = 0
      console.log(orderItem)
      for (let i = 0; i < orderItem.quantity; i++){
        let _bom = orderItem.bom_template.products ? orderItem.bom_template.products : ["z3acikruw24l618"]
        await orderItemService.create({order:order.id, price:orderItem.price, products:_bom, status: OrderStatus.Aufgegeben , menu_item:orderItem.id,menu_item_name:orderItem.name, notes: orderItem.notes[i]})
        _orderItem = orderItem
        count += 1
      }
      orderItem.quantity -= count   

      if (orderItem.quantity <= 0){
        removeFromCart(orderItem,orderItem.table,orderItem.person)
      } 
    }
  }
}

</script>

<template>
  <DefaultLayout footer="waiter-nav">
    <WaiterControlHeader :label="'Bestellung: '+tableId" icon="bill" />
    <!-- Scrollable Content Section -->
    <div class="relative mt-4 px-8 overflow-y-auto max-h-[calc(100vh-22rem)] w-full">
      <Accordion type="multiple" class="w-4/5 mx-auto">
        <AccordionItem v-for="person in persons" :key="person" :value="person">
          <AccordionTrigger>Person: {{person}}
            <Button @click="handleOrderSend(person,tableId)" @click.stop> Send Order </Button>
          </AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableBody>
                <template v-for="orderItem in cartStore.cart.filter(item => item.person === person && item.table === tableId)">
                  <template v-for="index in orderItem.quantity">
                    <TableRow>
                      <TableCell class="w-3/5">
                        {{orderItem.name}}
                      </TableCell>
                      <TableCell class="w-2/5">
                        {{((orderItem.price)/100).toFixed(2)}}€
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colspan="2">
                        <input id="input"
                          v-model="orderItem.notes[parseInt(index-1)]"
                          type="text" collspan="2"
                          class=" block w-full rounded-md border"
                          :placeholder="Notiz">  <!-- focus:border-blue-500 focus:ring focus:ring-blue-100 focus:ring-opacity-50"> -->
                          
                        </input>       
                      </TableCell>
                    </TableRow>
                  </template>
                </template>
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </DefaultLayout>
</template>
