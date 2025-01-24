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
import Collapsible from "@/components/ui/collapsible/Collapsible.vue";
import CollapsibleContent from "@/components/ui/collapsible/CollapsibleContent.vue";
import CollapsibleTrigger from "@/components/ui/collapsible/CollapsibleTrigger.vue";
import { OrderItemStatus } from "@/interfaces/order/OrderItem";

const addToCart = (product: string, table: string, person: string) => {
  cartStore.addToCart(product,table, person);
};

const subFromCart = (product: string, table: string, person: string) => {
  cartStore.subFromCart(product,table, person);
};

const removeFromCart = (product: string, table: string, person: string) => {
  cartStore.removeFromCart(product,table, person);
};

const clearCart = () => {
  cartStore.clearCart();
}

let persons: string[] = []
for (let orderItem of cartStore.cart){
  if (persons.includes(orderItem.person) == false){
    persons.push(orderItem.person)
  }
}

const isOpen = ref(false)

async function handleOrderSend(person:string, table: string){
  if (cartStore.cart.filter((item: any) => item.person === person && item.table === table).length > 0){
    let tableIdInt= parseInt(tableId.value)
    const waiter = authService.getCurrentUser()
    const order = await orderService.create({table: tableIdInt, waiter: waiter.id, status: OrderStatus.Aufgegeben})


    let _orderItem = undefined;
    for (let orderItem of (cartStore.cart.filter((item: any) => item.person === person && item.table === table))){
      console.log(orderItem.notes)

      let count = 0
      console.log(orderItem)
      for (let i = 0; i < orderItem.quantity; i++){
        let _bom = orderItem.bom_template.products ? orderItem.bom_template.products : ["z3acikruw24l618"]
        await orderItemService.create({order:order.id, price:orderItem.price, products:_bom, status: OrderItemStatus.Aufgegeben, menu_item:orderItem.id,menu_item_name:orderItem.name, notes: orderItem.notes[i]})
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
              <TableBody as-child>
                <template v-for="orderItem in cartStore.cart.filter((item: any) => item.person === person && item.table === tableId)">
                  <template v-for="index in orderItem.quantity">
                    <Collapsible as-child v-model:open="orderItem.isOpen[parseInt(index-1)]">
                      <CollapsibleTrigger as-child @click="()=>{console.log(orderItem); if (orderItem.notes[parseInt(index-1)]!==''){orderItem.isOpen[parseInt(index-1)]=true}}">
                        <TableRow as-child>
                          <TableCell class="w-3/5" as-child>
                              {{orderItem.name}}
                          </TableCell>
                          <TableCell class="w-2/5">
                            {{((orderItem.price)/100).toFixed(2)}}€
                          </TableCell>
                        </TableRow>
                      </CollapsibleTrigger >
                      <CollapsibleContent>
                        <TableRow>
                          <TableCell colspan="2">
                            <input id="input"
                              v-model="orderItem.notes[parseInt(index-1)]"
                              type="text" collspan="2"
                              class=" block w-full rounded-md border">
                              <!-- :placeholder="Notiz">  -->
                            </input>       
                          </TableCell>
                        </TableRow>
                      </CollapsibleContent>
                    </Collapsible>     
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
