<!-- <script setup lang ="ts">
import { Toggle } from '../components/ui/toggle'
 -->
<!-- </script> -->

<script setup>
import { computed, reactive, ref } from 'vue';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '@/components/ui/table';

// Tabs and Orders
const tabs = ['Crepes', 'Sandwiches', 'Heißgetränke', 'Kaltgetränke'];
const activeTab = ref(tabs[1]);

const orders = reactive({
  Crepes: [
    { table: '2', waiter: 'Lea', time: '16:03 Uhr' , state: false, orderlist: ['nutella', 'nutella', 'Käseschinken'], clicked: [false,false,false]},
    { table: '3', waiter: 'Sylvie', time: '16:07 Uhr', state: false , orderlist: ['Zucker & Zimt', 'nutella', 'Käseschinken', 'Zucker'], clicked: [false,false,false,false]},
  ],
  Sandwiches: [
    { table: '6', waiter: 'Robin', time: '14 Uhr' , state: false, orderlist: ['Käse'], clicked: [false]},
    { table: '4', waiter: 'Martin', time: '17:89 Uhr', state: false, orderlist: ['Käse'],  clicked: [false]},
  ],
  'Heißgetränke': [],
  'Kaltgetränke': [],
});

const changetime = (activeTab, index) => {
    console.log(orders[activeTab])
    orders[activeTab][index].state = !orders[activeTab][index].state;
    console.log(orders[activeTab][index].state)
    // var = console.log(orders[activeTab][index].state)

    console.log(activeTab)
}
const changeclicked = (activeTab, index, itemIndex) => {
    console.log(orders[activeTab])
    // orders[activeTab][index].state = !orders[activeTab][index].state;
    orders[activeTab][index].clicked[itemIndex] = !orders[activeTab][index].clicked[itemIndex];
    console.log(orders[activeTab][index].state)
    // var = console.log(orders[activeTab][index].state)

    console.log(activeTab)
}
</script>

<template>
  <div class="flex flex-col h-screen justify-between bg-opacity-30 bg-beige">
    <!-- Navigation Bar -->
    <div class="flex justify-between text-black px-4 py-2 bg-gradient-to-b from-amber-900 ">
        <span class="text-lg font-bold">Supotsu no Ochaya</span>
        <span class="text-sm italic">-- Exit logo --</span>
    </div>

    <!-- Tab Bar -->
    <div class=" flex w-full space-x-1 pt-2">
      <button
        v-for="tab in tabs"
        :key="tab"
        @click="activeTab = tab"
        class="px-4 rounded-md w-1/4 border-amber-900 border-opacity-40 py-2 "
        :class="activeTab === tab ? 'rounded-md  border-2 bg-brown-200 bg-opacity-70' : 'bg-transparent border-b-2'"
      >
        {{ tab }}
      </button>
    </div>

    <!-- Content Area -->
    <div class="flex flex-1 pt-14">
      <!-- Left Panel -->
      <div class="w-1/2 border-r border-gray-500 px-24">
        <h2 class="text-xl italic mb-4">{{ activeTab }}</h2>
        <div class="flex items-center text-base justify-between text-black px-4">
            <span >Tisch</span>
            <span >Kellner</span>
            <span >Eingegangen um</span>
        </div>
        <div v-for="(order, orderIndex) in orders[activeTab]" :key="orderIndex" class="py-2">
            <button 
                @click= "changetime(activeTab, orderIndex)"
                class=" border-gray-500 border w-full"
                :class="order.state ? 'bg-brown-200 bg-opacity-70 border-gray-900' : ''"

            >
            <div class="items-center justify-between py px-6 flex">
                <span> {{ order.table }} </span>
                <span> {{ order.waiter }} </span>
                <span> {{ order.time }} </span>
            </div>
            </button>
            <div v-for="(itemName, itemIndex) in order.orderlist" class="justify-items-between ">
              <button v-if="order.clicked[itemIndex]" 
              @click ="changeclicked(activeTab, orderIndex, itemIndex)" class="flex justify-between py-1 w-full">
               <span class="line-through"> {{ itemName }} </span>
               <span> Abholbereit </span>
            </button>
              <button @click="changeclicked(activeTab, orderIndex, itemIndex)" v-else-if="order.state" class="flex justify-between py-1 w-full">
                <span> {{ itemName }} </span>
                <span> In Bearbeitung</span>
              </button>
                <button  v-else class="flex justify-between py-1 w-full"> <span> {{ itemName }} </span> <span> bestellt </span> </button>
                <!-- <Table>
                    <TableBody class="justify-between">
                        <TableRow v-for="item in orders[activeTab][index].orderlist" class="justify-between r-0">
                            <TableCell class="flex right-0">{{ item }}</TableCell>
                            <TableCell v-if="order.state" class="justify-between"> In Bearbeitung </TableCell>
                            <TableCell v-else class="justify-between"> Bestellt </TableCell>
                        </TableRow>
                    </TableBody>
                </Table> -->
            </div>
        </div>
      </div>

      <!-- Right Panel -->
      <div class="w-1/2 flex items-center justify-center text-gray-500">
        <p>Platzhalter für zukünftige Inhalte</p>
      </div>
    </div>

    <!-- Footer -->
    <div class="fixed right-2 bottom-2 text-white py-2">
      <button class="px-4 py-2 bg-gray-800 rounded">Verlauf anzeigen</button>
    </div>
  </div>
  
</template>



<style scoped>
/* Custom colors */ 
.bg-beige {
  background-color: #ECD9C7;
  ;
}

.bg-brown-400 {
  background-color: #6b4226;
}

.bg-brown-300 {
  background-color: #8c5e3b;
}

.bg-brown-200 {
  background-color: #c6a890;
}

.bg-brown-100 {
  background-color: #eed9c4;
}

</style>
