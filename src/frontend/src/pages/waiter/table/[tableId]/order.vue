<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { DefaultLayout } from "@/layouts/default";
import { useCartStore, lockedStore } from "@/components/cart.js";
import { Table, TableCell, TableBody, TableRow} from '@/components/ui/table';
import { Tabs, TabsContent, TabsTrigger, TabsList} from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import { reactive, ref, computed } from 'vue';
import WaiterControlHeader from "@/components/waiter/WaiterControlHeader.vue";

import {orderService} from "@/services/order/orderService.ts";
import {orderItemService} from "@/services/order/orderItemService.ts";
import {authService} from "@/services/user/authService.ts";
import {OrderStatus} from "@/interfaces/order/Order";
import Collapsible from "@/components/ui/collapsible/Collapsible.vue";
import CollapsibleContent from "@/components/ui/collapsible/CollapsibleContent.vue";
import CollapsibleTrigger from "@/components/ui/collapsible/CollapsibleTrigger.vue";
import { OrderItemStatus } from "@/interfaces/order/OrderItem";
import { LucideScrollText } from "lucide-vue-next";

const router = useRouter();
const route = useRoute("/waiter/table/[tableId]/order");
const tableId = computed(() => route.params.tableId);

const cartStore = reactive(useCartStore());

// const lockedStore = reactive(lockedCart())

//TODO delete later
const lockPerson = (table: string, person:string)=> {
  lockedStore.lockPerson(table, person)
}

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

const isOpen = ref(false) //TODO delete

async function handleOrderSend(person:string, table: string) {
  lockedStore.lockPerson(table, person)
  console.log(lockedStore.value)
  if (cartStore.cart.filter((item: any) => item.person === person && item.table === table).length > 0) {
    let tableIdInt = parseInt(tableId.value)

    const waiter = authService.getCurrentUser()
    const order = await orderService.create({table: tableIdInt, waiter: waiter.id, status: OrderStatus.Aufgegeben, person: person})


    for (let orderItem of (cartStore.cart.filter((item: any) => item.person === person && item.table === table))) {
      for (let i = 0; i < orderItem.quantity; i++) {
        let _bom = orderItem.bom_template.products ? orderItem.bom_template.products : ["z3acikruw24l618"]
        let response = await orderItemService.create({
          order: order.id,
          price: orderItem.price,
          products: _bom,
          status: OrderItemStatus.Aufgegeben,
          menu_item: orderItem.id,
          menu_item_name: orderItem.name,
          notes: orderItem.notes[i]
        })
        orderItem.orderId.push(response.id)
      }

      orderItem.isSend = true

      if (orderItem.station !== "") {
        cartStore.removeFromCart(orderItem, table, person);
      }
    }
  }
}
async function handleOrderGrabed(person:string, table:string){
  for (const orderItem of (cartStore.cart.filter((item: any) => item.person === person && item.table === table && item.isSend === true && item.station === ""))){
    for (let i = 0; i < orderItem.quantity; i++) {
      await orderItemService.updateOrderItemToStatus(orderItem.orderId[i], OrderItemStatus.Geliefert)
    }
  cartStore.removeFromCart(orderItem,table,person);
  }
}

// delete them later or add a button
// cartStore.clearCart()
// lockedStore.clearCart()
</script>

<template>
  <DefaultLayout footer="waiter-nav">
    <WaiterControlHeader :label="'Tisch: '+tableId" icon="bill" />
      <Tabs>
        <TabsList class="flex justify-center w-full">
          <TabsTrigger value="order" class="w-1/2">
            Bestellung
          </TabsTrigger>
          <TabsTrigger value="pickup" class="w-1/2">
            Liefern
          </TabsTrigger>
        </TabsList>
        <TabsContent value="order">
          <!-- Scrollable Content Section -->
          <div class="relative mt-4 px-8 overflow-y-auto max-h-[calc(100vh-14rem)] w-full">
            <Accordion type="multiple" class="w-4/5 mx-auto">
              <AccordionItem v-for="person in persons" :key="person" :value="person">
                <AccordionTrigger>Person: {{person}}
                  <Button @click="()=>{handleOrderSend(person,tableId)}" @click.stop> Send Order </Button>
                </AccordionTrigger>
                <AccordionContent>
                  <Table>
                    <TableBody as-child>
                      <template v-for="orderItem in cartStore.cart.filter((item: any) => item.person === person && item.table === tableId)">
                        <template v-if="!orderItem.isSend" v-for="index in orderItem.quantity">
                          <Collapsible as-child v-model:open="orderItem.isOpen[parseInt(index-1)]">
                            <CollapsibleTrigger as-child @click="()=>{if (orderItem.notes[parseInt(index-1)]!==''){orderItem.isOpen[parseInt(index-1)]=true}}">
                              <TableRow as-child>
                                <TableCell class="" as-child>
                                  {{orderItem.name}}
                                </TableCell>
                                <TableCell class="max-w-min">
                                  {{((orderItem.price)/100).toFixed(2)}}€
                                </TableCell>
                              <TableCell>
                              <LucideScrollText class="size-4 max-w-min"/>
                            </TableCell>
                          </TableRow>
                            </CollapsibleTrigger >
                            <CollapsibleContent>
                              <Table>
                                <TableBody>
                                  <TableRow class="w-full">
                                    <TableCell class="flex">
                                      <input id="input"
                                            v-model="orderItem.notes[parseInt(index-1)]"
                                            type="text" maxlength="300" rows="1"
                                            class="w-full rounded-md border text-ellipsis overflow-hidden">
                                      </input>
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
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
        </TabsContent>
        <!-- Visual Help --->
        <TabsContent value="pickup">
          <!-- Scrollable Content Section -->
          <div class="relative mt-4 px-8 overflow-y-auto max-h-[calc(100vh-14rem)] w-full">
            <Accordion type="multiple" class="w-4/5 mx-auto">
              <AccordionItem v-for="person in persons" :key="person" :value="person">
                <AccordionTrigger>Person: {{person}}
                  <Button @click="handleOrderGrabed(person,tableId)" @click.stop> Geliefert </Button>
                </AccordionTrigger>
                <AccordionContent>
                  <Table>
                    <TableBody as-child>
                      <template v-for="orderItem in cartStore.cart.filter((item: any) => item.person === person && item.table === tableId)">
                        <template v-if="orderItem.isSend && orderItem.station ===''" v-for="index in orderItem.quantity">
                          <Collapsible as-child v-model:open="orderItem.isOpen[parseInt(index-1)]">
                            <CollapsibleTrigger as-child @click="()=>{if (orderItem.notes[parseInt(index-1)]!==''){orderItem.isOpen[parseInt(index-1)]=true}}">
                              <TableRow as-child>
                                <TableCell class="w-max-min" as-child>
                                  {{orderItem.name}}
                                </TableCell>
                                <TableCell class="w-max-min">
                                  {{((orderItem.price)/100).toFixed(2)}}€
                                </TableCell>
                              </TableRow>
                            </CollapsibleTrigger >
                            <CollapsibleContent>  //TODO delete collabsible since it´s unused in LIEFERN
                              <Table>
                                <TableRow v-if="orderItem.notes[parseInt(index-1)]" class="">
                                  <TableCell colspan="2" class="block w-full rounded-md border mr-1 bg-secondary">
                                    {{orderItem.notes[parseInt(index-1)]}}
                                  </TableCell>
                                </TableRow>
                              </Table>
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
        </TabsContent>
      </Tabs>
  </DefaultLayout>
</template>
