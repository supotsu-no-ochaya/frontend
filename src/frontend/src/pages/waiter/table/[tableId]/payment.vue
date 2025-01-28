<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {DefaultLayout} from "@/layouts/default";
import {computedAsync} from "@vueuse/core";
import {computed, reactive} from 'vue';

import {orderService} from "@/services/order/orderService.ts";
import {orderItemService} from "@/services/order/orderItemService.ts";
import {menuItemService} from "@/services/menu/menuItemService.ts";
import {paymentService} from "@/services/payment/paymentService.ts";
import {OrderStatus} from "@/interfaces/order/Order";
import { lockedStore } from "@/components/cart.js";

import {Table, TableBody, TableCell, TableRow} from '@/components/ui/table';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/accordion';
import {Checkbox} from '@/components/ui/checkbox';
import WaiterControlHeader from "@/components/waiter/WaiterControlHeader.vue";
import {OrderItemStatus} from "@/interfaces/order/OrderItem.ts";

const router = useRouter();
const route = useRoute("/waiter/table/[tableId]/payment");
const tableId = computed(() => route.params.tableId);
let Rabatt = reactive({value:0.10,checked: false})

let orders = reactive(computedAsync(() =>
  orderService.getAll().then((orders) =>
    orders
      .filter(order => order.table === parseInt(tableId.value))
      .filter(order => order.status === OrderStatus.Geliefert) // Comment this line to show partially delivered orders
      .map((order) => ({
        ...order,              // Spread existing properties
        total: 0,        // Add the new property
        isChecked: false // Add the new property
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
      }))
  )
));

let menuItems = computedAsync(() => menuItemService.getAll());

// Method to handle checkbox changes and update the total dynamically
const handleItemCheckboxChange = (order: any, orderItem: any, checked: boolean) => {
  // Update the item's checked status
  orderItem.isChecked = checked ;

  // Recalculate the total for this order
  order.total = calculateTotal(order, orderItem, checked);
};

function handleOrderCheckboxChange(order, checked){
  for (let _orderItem of orderItems.value) {
    if (_orderItem.order == order.id){
      _orderItem.isChecked = checked
      calculateTotal(order,_orderItem,_orderItem.isChecked)
    }
  }
  updateOrderTotal(order)
  updateTotalSum()
}

const handleRabattCheckboxClick = (checked: boolean) =>  {
  Rabatt.checked = checked
  updateTotalSum();
}

const handleLockedPersons = ()=>{
  let persons = lockedStore.noCart.filter(item=> item.table == tableId.value).map(item=> item.person)
  for (let person of persons){
    lockedStore.openPerson(tableId.value, person)
  } //TODO only opens persons, where there is no order
}

const handleBezahlenButtonClick = async () =>{
  handleLockedPersons() //Opens all Persons for now
  let  _orderItems: string[] = []
  let _discount: number = 0;
  let _total_amount = 0;
  if (Rabatt.checked){
    _discount = parseInt(Rabatt.value*100)
  }
  orderItems.value.forEach(orderItem => {
      if (orderItem.isChecked){
        _orderItems.push(orderItem.id)
        _total_amount += orderItem.price
        orderItemService.updateOrderItemToStatus(orderItem.id, OrderStatus.Bezahlt)
      }
    })
    paymentService.create({order_items: _orderItems,  discount_percent:_discount, total_amount: _total_amount})
  }

// Method to calculate total for a order bas  ed on checked items
const calculateTotal = (order, orderItem, checked) => {
  if (checked === true){
    order.total = order.total + parseFloat(orderItem.price)
  } else if (checked === false){
    order.total = order.total - parseFloat(orderItem.price)
  }

  updateTotalSum();
  updateOrderTotal(order);

  return order.total
};

function calculateTotalSum() {
  var totalSum = 0.00;
  try{
    for (let i = 0; i < orders.value.length; i++) {
      totalSum += orders.value[i].total;
    }
    if (Rabatt.checked) {
      totalSum = totalSum*(1-Rabatt.value)
    }
  } catch{
  }
  return totalSum;
}

function updateTotalSum(){
  document.getElementById("totalSum").textContent = "Total Sum: "+calculateTotalSum()+"€";
}

function updateOrderTotal(order){
  const id = "order-"+order.id

  const element = document.getElementById(id);
  if (element !== null)
    element.textContent = order.id+': '+(order.total/100).toFixed(2)+'€';
}

</script>

<template>
  <DefaultLayout footer="waiter-nav">
    <WaiterControlHeader :label="'Bezahlen Tisch: '+tableId" icon="bill" />
    <!-- Scrollable Content Section -->
    <div class="relative mt-4 px-8 overflow-y-auto max-h-[calc(100vh-22rem)] w-full">
      <Accordion type="multiple" class="w-4/5 mx-auto">
        <AccordionItem v-for="order in orders" :key="order.id" :value="order.status">
          //TODO Change to Person an Table
          <AccordionTrigger>Bestellung: {{order.id}}
            <Checkbox
              :v-model="order.isChecked"
              @update:checked="(checked) => handleOrderCheckboxChange(order, checked)"
              @click.stop
            />
          </AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableBody>
                <TableRow
                v-for="orderItem in orderItems">
                  <TableCell class="w-2/5" v-if="orderItem.order == order.id" >
                    <div>{{menuItems.find(menuItem => menuItem.id === orderItem.menu_item).name}}</div>
                  </TableCell>
                  <TableCell class="w-2/5" v-if="orderItem.order == order.id" >
                    <div>{{ orderItem.price/100 }}€</div>
                  </TableCell>
                  <TableCell class="w-1/5" v-if="orderItem.order == order.id">
                    <Checkbox
                      :checked="orderItem.isChecked"
                      @update:checked="(checked) => handleItemCheckboxChange(order, orderItem, checked)"
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div class="flex items-center justify-center font-bold mt-2" :id="'order-' + order.id">{{ order.id }}: 0.00€</div>
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
      <div class="flex items-center fixed bottom-16 left-0 w-full bg-primary text-lg font-bold text-center py-4">
        <Button class="w-1/5 ml-2 bg-secondary active:bg-primary text-black"
        @click="handleBezahlenButtonClick()">

          Bezahlen
        </Button>
        <Suspense>
        <strong class="w-3/5" id="totalSum">Total Sum: {{calculateTotalSum()/100}}€</strong>
        </Suspense>
        <Button class="w-1/5 mr-2 bg-accent active:bg-primary text-black" @click="getOrderItemsByStation()">
          Anpassen
        </Button>
      </div>
  </DefaultLayout>
</template>
