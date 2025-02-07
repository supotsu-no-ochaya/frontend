<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { DefaultLayout } from "@/layouts/default";
import { computedAsync } from "@vueuse/core";
import { computed, reactive, ref } from 'vue';

import { orderService } from "@/services/order/orderService.ts";
import { orderItemService } from "@/services/order/orderItemService.ts";
import { menuItemService } from "@/services/menu/menuItemService.ts";
import { paymentService } from "@/services/payment/paymentService.ts";
import { OrderStatus } from "@/interfaces/order/Order";
import { lockedStore } from "@/components/cart.js";

import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'; // Import shadcn-vue Popover
import { Input } from '@/components/ui/input'; // Import shadcn-vue Input
import WaiterControlHeader from "@/components/waiter/WaiterControlHeader.vue";
import { OrderItemStatus } from "@/interfaces/order/OrderItem.ts";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import {useTableStore} from "@/components/TableInfo";

const router = useRouter();
const route = useRoute("/waiter/table/[tableId]/payment");
const tableId = computed(() => route.params.tableId);
const tableStore = useTableStore()
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
let Rabatt = reactive({ value: 0.10, checked: false });
let isPopoverOpen = ref(false); // State to control popover visibility
let tipValue = ref(); // State for tip input
let isAdjustPopoverOpen = ref(false); // State to control the second popover
let adjustedTotalAmount = ref(0); // State for adjusted total amount input
let adjustedDiscountAmount = ref(0); // State for adjusted discount amount input
let paymentOption = ref('cash')

let orders = reactive(computedAsync(() =>
  orderService.getAll().then((orders) =>
    orders
      .filter(order => order.table === parseInt(tableId.value))
      .filter(order => order.status === OrderStatus.Geliefert) // Comment this line to show partially delivered orders
      .map((order) => ({
        ...order,              // Spread existing properties
        total: 0,        // Add the new property
        isChecked: false, // Add the new property
        someChecked: false,
      }))
  )
));

let orderItems = reactive(computedAsync(() =>
  Promise.all([orderItemService.getAll(), orders.value]).then(([orderItems, currentOrders]) =>
    orderItems
      .filter(item => currentOrders.some(order => order.id === item.order)) // Filter by matching order ID
      .filter(item => item.status === OrderItemStatus.Geliefert) // Filter by Status
      .map((item) => ({
        ...item, // Spread existing properties
        isChecked: false, // Add the new property
        isPayed: false
      }))
  )
));

let menuItems = computedAsync(() => menuItemService.getAll());

// Method to handle checkbox changes and update the total dynamically
const handleItemCheckboxChange = (order: any, orderItem: any, checked: boolean) => {
  // Update the item's checked status
  orderItem.isChecked = checked;
  // console.log(orderItem)
  order.isChecked = orderItems.value?.filter(orderitems=> orderitems.order === order.id).every(orderitem => orderitem.isChecked)
  // console.log(order.isChecked)
  // console.log("orders", orders.value)
  order.someChecked = orderItems.value?.filter(orderitems=> orderitems.order === order.id).some(orderitem => orderitem.isChecked)
  // console.log(order.someChecked)

  // Recalculate the total for this order
  calculateTotal(order, orderItem, checked);
};

function togglePaymentOption(option: string){
  paymentOption.value = option
  console.log(paymentOption)
}

const toggleChecked = (order) => {
  order.isChecked = !order.isChecked;
  // console.log("Neuer Wert:", order.isChecked);
};

function handleOrderCheckboxChange(order, checked) {
  // Update the checked status of all items in the order
  for (let _orderItem of orderItems.value) {
    if (_orderItem.order == order.id) {
      _orderItem.isChecked = checked;
    }
  }

  // Recalculate the total for the entire order
  calculateOrderTotal(order);
}

const calculateOrderTotal = (order) => {
  let total = 0;
  for (let _orderItem of orderItems.value) {
    if (_orderItem.order == order.id && _orderItem.isChecked) {
      total += parseFloat(_orderItem.price);
    }
  }
  order.total = total;
  updateTotalSum();
};

const handleRabattCheckboxClick = (checked: boolean) => {
  Rabatt.checked = checked;
  updateTotalSum();
}

const handleLockedPersons = () => {
  console.log(orders.value)
  let persons = orders.value.filter((order)=>order.isChecked === true).map(order=>order.person)
  console.log(persons)
  for (let person of persons) {
    lockedStore.openPerson(tableId.value, person.toString());
  }
}

const handleConfirmPayment = async () => {
  isPopoverOpen.value = false; // Close the popover
  tableStore.table.tableEmpty[tableId.value-1] = true;
  tableStore.table.timers[tableId.value-1] = null;
  handleLockedPersons(); // Open all Persons for now
  let _orderItems: string[] = [];
  let _total_amount = 0;
  let _discount = 0
  if (Rabatt.checked) {
    _discount = parseInt(Rabatt.value * 100);
  }
  orderItems.value.forEach(orderItem => {
    if (orderItem.isChecked) {
      _orderItems.push(orderItem.id);
      _total_amount += orderItem.price;
      orderItemService.updateOrderItemToStatus(orderItem.id, OrderStatus.Bezahlt);
      orderItem.isPayed = true,
      orderItem.isChecked = false,
      console.log("orderitem", orderItem)
    }
  });
  paymentService.create({ order_items: _orderItems, payment_option: paymentOption.value =='cash'? '3gie4k61or17sfk' : '2dbpn606978dru1', discount_percent: _discount, total_amount: _total_amount, tip_amount: tipValue.value });
}

const handleAdjustPayment = async () => {
  isAdjustPopoverOpen.value = false; // Close the popover
  tableStore.table.tableEmpty[tableId.value-1] = true;
  tableStore.table.timers[tableId.value-1] = null;
  let _orderItems: string[] = [];
  orderItems.value.forEach(orderItem => {
    if (orderItem.isChecked) {
      _orderItems.push(orderItem.id);
      orderItemService.updateOrderItemToStatus(orderItem.id, OrderStatus.Bezahlt);
    }
  });
  paymentService.create({ order_items: _orderItems, payment_option: paymentOption.value =='cash'? '3gie4k61or17sfk' : '2dbpn606978dru1', discount_percent: adjustedDiscountAmount.value, total_amount: adjustedTotalAmount.value, tip_amount: tipValue.value });
}

// Method to calculate total for a order based on checked items
const calculateTotal = (order, orderItem, checked) => {
  if (checked === true) {
    order.total += parseFloat(orderItem.price);
  } else if (checked === false) {
    order.total -= parseFloat(orderItem.price);
  }

  updateTotalSum();

  return order.total;
};

function calculateTotalSum() {
  var totalSum = 0.00;
  try {
    for (let i = 0; i < orders.value.length; i++) {
      totalSum += orders.value[i].total;
    }
    if (Rabatt.checked) {
      totalSum = totalSum * (1 - Rabatt.value);
    }
  } catch {
  }
  return totalSum;
}

function updateTotalSum() {
  document.getElementById("totalSum").textContent = "Total Sum: " + calculateTotalSum() + "€";
}
</script>

<template>
  <DefaultLayout footer="waiter-nav">
    <WaiterControlHeader :label="'Bezahlen Tisch: ' + tableId" icon="bill" />
    <!-- Scrollable Content Section -->
    <div class="relative mt-4 px-8 overflow-y-auto max-h-[calc(100vh-22rem)] w-full">
      <Accordion type="multiple" class="w-4/5 mx-auto">
        <AccordionItem v-for="order in orders" :key="order.id" :value="order.status">
          <!--TODO delete collabsible since it´s unused in LIEFERN-->
          <AccordionTrigger> Person: {{ order.person }}
            <Checkbox
              :checked="order.isChecked"
              :indeterminate="order.someChecked && !order.isChecked"
              @update:checked="(checked) =>{handleOrderCheckboxChange(order, checked); console.log(order.isChecked)}"
              @click.stop="toggleChecked(order)"
              :class="{'bg-ring': order.someChecked && !order.isChecked,
                        '': !order.someChecked
              }" />
          </AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableBody>
                <template v-for="orderItem in orderItems">
                  <TableRow v-if="orderItem.order == order.id && !orderItem.isPayed">
                    <!-- Name Column -->
                    <TableCell class="min-w-max">
                      <div> {{ menuItems.find(menuItem => menuItem.id === orderItem.menu_item).name }} </div>
                    </TableCell>

                    <!-- Price Column (Right-aligned) -->
                    <TableCell class="min-w-max text-right pr-4">
                      <div>{{ (orderItem.price / 100).toFixed(2) }}€</div>
                    </TableCell>

                    <!-- Checkbox Column (Centered) -->
                    <TableCell class="w-1/5 text-center">
                      <Checkbox
                        :checked="orderItem.isChecked"
                        @update:checked="(checked) => handleItemCheckboxChange(order, orderItem, checked)"
                      />
                    </TableCell>
                  </TableRow>

                  <!-- Notes Row -->
                  <TableRow v-if="orderItem.notes && orderItem.order == order.id">
                    <TableCell colspan="3" class="block w-full rounded-md border bg-secondary">
                      {{ orderItem.notes }}
                    </TableCell>
                  </TableRow>
                </template>
              </TableBody>
            </Table>
            <div class="flex items-center justify-center font-bold mt-2" :id="'order-' + order.id"></div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
    <!-- Rabatt Section -->
    <div class="flex fixed bottom-33 left-16 w-full px-8">
      <div class="flex items-center">
        <Checkbox
          class="border-black border w-4 h-4 mr-2"
          :v-model="Rabatt.checked"
          @update:checked="(checked) => handleRabattCheckboxClick(checked)"
        />
        <div>Rabatt von {{ Rabatt.value * 100 }}%</div>
      </div>
    </div>

    <!-- Footer Section -->
    <div class="flex items-center fixed bottom-16 left-0 w-full bg-primary text-lg font-bold text-center py-4 ">
      <Dialog class="rounded-md"> 

      <!-- </Dialog>v-model:open="isPopoverOpen"> -->
        <DialogTrigger class="w-1/5 min-w-min ml-2 bg-secondary active:bg-secondary text-black rounded-sm">
            Bezahlen
        </DialogTrigger>
        <DialogContent class="w-11/12 max-w-[425px] border-amber-900 border-opacity-40 border rounded-md">
          <DialogHeader>
            <DialogTitle class="text-left mb-2"> Übersicht </DialogTitle>
            <DialogDescription>
              <button @click="togglePaymentOption('cash');":class="paymentOption=='cash' ? 'bg-primary': 'bg-secondary'" class="text-black mx-2 rounded-sm font-bold w-1/3 max-w-[100px] self-start min-h-min p-2">
                BAR
              </button>
              <button @click="togglePaymentOption('card');" :class="paymentOption=='card' ? 'bg-primary': 'bg-secondary'" class="text-black mx-2 rounded-sm font-bold w-1/3 max-w-[100px] self-start min-h-min p-2 mb-2">
                Karte
              </button>
              <Input v-model="tipValue" type="number" placeholder="Trinkgeld in ct" class=""/>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter class="justify-between flex w-full">
            <Suspense>
              <strong class="" id="totalSum">Totale Summe: {{ calculateTotalSum() / 100 }}€</strong>
            </Suspense>
            <button @click="handleConfirmPayment" class="bg-primary active:bg-secondary h-full max-w-min px-2 py-1 rounded-sm" type="submit">
              Bezahlen
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Suspense>
        <strong class="w-3/5" id="totalSum">Totale Summe: {{ calculateTotalSum() / 100 }}€</strong>
      </Suspense>
      <Popover v-model:open="isAdjustPopoverOpen">
        <PopoverTrigger asChild>
          <Button class="w-1/5 mr-2 bg-accent active:bg-primary text-black">
            Anpassen
          </Button>
        </PopoverTrigger>
        <PopoverContent class="w-full mr-4">
          <div class="flex flex-col gap-4">
            <h2 class="text-lg font-bold">Zahlung anpassen</h2>
            <p>Gesamtbetrag in ct:</p>
            <Input v-model="adjustedTotalAmount" type="number" placeholder="Gesamtbetrag in ct" />
            <p>Trinkgeld in ct:</p>
            <Input v-model="tipValue" type="number" placeholder="Trinkgeld in ct" />
            <p>Rabatt in %:</p>
            <Input v-model="adjustedDiscountAmount" type="number" placeholder="Rabatt in %" />
            <Button @click="handleAdjustPayment" class="w-full">Anpassen</Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  </DefaultLayout>
</template>
