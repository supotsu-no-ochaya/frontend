<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { DefaultLayout } from "@/layouts/default";
import { computedAsync } from "@vueuse/core";
import { reactive, ref, computed } from 'vue';

import { orderService } from "@/services/order/orderService.ts";
import { orderItemService } from "@/services/order/orderItemService.ts";
import { menuItemService } from "@/services/menu/menuItemService.ts";
import { paymentService} from "@/services/payment/paymentService.ts";
//import { Payment } from "@/interfaces/payment/Payment.ts";

import { Table, TableCell, TableBody, TableRow} from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import WaiterControlHeader from "@/components/waiter/WaiterControlHeader.vue";

const router = useRouter();
const route = useRoute("/waiter/table/[tableId]/payment");
const tableId = computed(() => route.params.tableId);
let Rabatt = reactive({value:0.10,checked: false})

import { authService } from "@/services/user/authService.ts";
authService.login("Test", "123456789");

let orders = reactive(computedAsync(() =>
  orderService.getAll().then((orders) =>
    orders
      .filter(order => order.table === parseInt(tableId.value))
      .filter(order => order.status === "Geliefert")
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
      .filter(item => item.status === "Geliefert") // Filter by Status
      .map((item) => ({
        ...item, // Spread existing properties
        isChecked: false // Add the new property
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
  console.log("CHECKED",checked)
  for (let _orderItem of orderItems.value) {
    if (_orderItem.order == order.id){
      console.log(_orderItem)
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

const handleBezahlenButtonClick = async () =>{

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
        orderItemService.updateOrderItemToStatus(orderItem.id,"Bezahlt")
      }
    })
    paymentService.create({order_items: _orderItems,  discount_percent:_discount, total_amount: _total_amount})

    await new Promise(f => setTimeout(f, 1000));
    router.go(0)
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
  for (let i = 0; i < orders.value.length; i++) {
    totalSum += orders.value[i].total;
  }
  if (Rabatt.checked) {
    console.log(totalSum,Rabatt.value)
    totalSum = totalSum*(1-Rabatt.value)
  }
  return totalSum;
}

function updateTotalSum(){
  console.log("updateTotalSum");
  document.getElementById("totalSum").textContent = "Total Sum: "+calculateTotalSum()+"€";
}

function updateOrderTotal(order){
  const id = "order-"+order.id

  document.getElementById(id).textContent = order.id+': '+order.total.toFixed(2)+'€';
}

</script>

<template>
  <DefaultLayout footer="waiter-nav">
    <WaiterControlHeader :label="'Bezahlen Tisch: '+tableId" icon="bill" />
    {{orders}}
    <!-- Scrollable Content Section -->
    <div class="relative mt-4 px-8 overflow-y-auto max-h-[calc(100vh-22rem)] w-full">
      <Accordion type="multiple" class="w-4/5 mx-auto">
        <AccordionItem v-for="order in orders" :key="order.id" :value="order.status">
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
                    <div>{{ orderItem.price }}€</div>
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
            <div class="flex items-center justify-center font-bold mt-2" :id="'order-' + order.id">{{ order.id }}: 0€</div>
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
        <strong class="w-3/5" id="totalSum">Total Sum: {{calculateTotalSum()}}€</strong>
        </Suspense>
        <Button class="w-1/5 mr-2 bg-accent active:bg-primary text-black" @click="getOrderItemsByStation()">
          Anpassen
        </Button>
      </div>
  </DefaultLayout>
</template>
