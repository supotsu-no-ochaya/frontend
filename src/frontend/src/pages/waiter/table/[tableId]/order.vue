<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
import { DefaultLayout } from "@/layouts/default";
import { useCartStore } from "@/components/cart.js";
import { Table, TableCell, TableBody, TableRow} from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import { orderService } from "@/services/order/orderService.ts";
import { orderItemService } from "@/services/order/orderItemService.ts";

const route = useRoute("/waiter/table/[tableId]/order");
const tableId = computed(() => route.params.tableId);

const cartStore = useCartStore();

import { authService } from "@/services/user/authService.ts";
authService.login("Test", "123456789");

const addToCart = (product,table, person) => {
  cartStore.addToCart(product,table, person);
  console.log(cartStore.cart.find(item => item.id === product.id).quantity);
};

const subFromCart = (product,table, person) => {
  cartStore.subFromCart(product,table, person);
  console.log(cartStore.cart.find(item => item.id === product.id).quantity);
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
    console.log(cartStore.cart.filter(item => item.person === person && item.table === table))

    let _orderItem = undefined;
    for (let orderItem of cartStore.cart.filter(item => item.person === person && item.table === table)){
      for (let i = 0; i < orderItem.quantity; i++){
        let _bom = orderItem.bom_template.products ? orderItem.bom_template.products : ["z3acikruw24l618"]
        console.log(_bom)
        await orderItemService.create({order:order.id, price:orderItem.price, products:_bom, status:"Aufgegeben", menu_item:orderItem.id,menu_item_name:orderItem.name})
        _orderItem = orderItem
      }
    removeFromCart(_orderItem,_orderItem.table,_orderItem.person)
  }}
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
                <TableRow
                v-for="orderItem in cartStore.cart.filter(item => item.person === person && item.table === tableId)">
                  <TableCell class="w-3/5">
                    {{orderItem.quantity}}x {{orderItem.name}}
                  </TableCell>
                  <TableCell class="w-2/5">
                    {{((orderItem.price*orderItem.quantity)/100).toFixed(2)}}€
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </DefaultLayout>
</template>
