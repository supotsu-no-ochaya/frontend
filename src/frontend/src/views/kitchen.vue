<!-- <script setup lang ="ts">
import { Toggle } from '../components/ui/toggle'
 -->
<!-- </script> -->

<script setup>
import { computed, reactive, ref } from 'vue';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '@/components/ui/table';
import DefaultLayout from '@/layouts/default/DefaultLayout.vue';
import { ScrollBar, ScrollArea } from "@/components/ui/scroll-area"
import { Popover, PopoverContent,PopoverTrigger } from '@/components/ui/popover';

// Tabs and Orders
const tabs = reactive(['Crepes', 'Sandwiches', 'Heißgetränke', 'Kaltgetränke',"Essen 2"]);
const activeTab = ref([tabs[0]]);

const orders = reactive({
  Crepes: [
    { table: '2', waiter: 'Lea', time: '16:03 Uhr' , state: false, orderlist: ['nutella', 'nutella', 'Käseschinken'], clicked: [false,false,false]},
    { table: '3', waiter: 'Sylvie', time: '16:07 Uhr', state: false , orderlist: ['Zucker & Zimt', 'nutella', 'Käseschinken', 'Zucker'], clicked: [false,false,false,false]},
    { table: '3', waiter: 'Sylvie', time: '16:07 Uhr', state: false , orderlist: ['Zucker & Zimt', 'nutella', 'Käseschinken', 'Zucker'], clicked: [false,false,false,false]},
    { table: '3', waiter: 'Sylvie', time: '16:07 Uhr', state: false , orderlist: ['Zucker & Zimt', 'nutella', 'Käseschinken', 'Zucker'], clicked: [false,false,false,false]},
    { table: '3', waiter: 'Sylvie', time: '16:07 Uhr', state: false , orderlist: ['Zucker & Zimt', 'nutella', 'Käseschinken', 'Zucker'], clicked: [false,false,false,false]},
    { table: '3', waiter: 'Sylvie', time: '16:07 Uhr', state: false , orderlist: ['Zucker & Zimt', 'nutella', 'Käseschinken', 'Zucker'], clicked: [false,false,false,false]},


    { table: '3', waiter: 'Sylvie', time: '16:07 Uhr', state: false , orderlist: ['Zucker & Zimt', 'nutella', 'Käseschinken', 'Zucker'], clicked: [false,false,false,false]},
    { table: '3', waiter: 'Sylvie', time: '16:07 Uhr', state: false , orderlist: ['Zucker & Zimt', 'nutella', 'Käseschinken', 'Zucker'], clicked: [false,false,false,false]},
    { table: '3', waiter: 'Sylvie', time: '16:07 Uhr', state: false , orderlist: ['Zucker & Zimt', 'nutella', 'Käseschinken', 'Zucker'], clicked: [false,false,false,false]},
    { table: '3', waiter: 'Sylvie', time: '16:07 Uhr', state: false , orderlist: ['Zucker & Zimt', 'nutella', 'Käseschinken', 'Zucker'], clicked: [false,false,false,false]},
    { table: '3', waiter: 'Sylvie', time: '16:07 Uhr', state: false , orderlist: ['Zucker & Zimt', 'nutella', 'Käseschinken', 'Zucker'], clicked: [false,false,false,false]},
    { table: '3', waiter: 'Sylvie', time: '16:07 Uhr', state: false , orderlist: ['Zucker & Zimt', 'nutella', 'Käseschinken', 'Zucker'], clicked: [false,false,false,false]},
    { table: '2', waiter: 'Lea', time: '16:03 Uhr' , state: false, orderlist: ['nutella', 'nutella', 'Käseschinken'], clicked: [false,false,false]},

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
const printtab = () => {
  // activeTab = tabs[tab]
  console.log(activeTab.value)
}
</script>

<template>
  <!-- hidden-overflow -->
  <DefaultLayout class="flex flex-col h-screen justify-between"> 
    <!-- Tab Bar -->
        <div class="flex gap-1 px-2">

            <button
            v-for="(tab, tabIndex) in tabs"
            :key="tab"
            @click="activeTab.includes(tab) 
                  ? activeTab.splice(activeTab.indexOf(tab),1) 
                  : activeTab.length < 2 && activeTab.push(tab)"
              class="rounded-md w-11/12 min-w-max border-amber-900 border-opacity-40 py"
              :class="activeTab[0] === tab | activeTab[1] === tab 
                  ? 'rounded-md  border-2 bg-primary bg-opacity-70' 
                  : 'bg-transparent border-b-2'"
              >
              {{ tab }}
            </button>
        </div>
      

    <!-- Content Area -->
    <div class="flex flex-1 pt-8 justify-center">
      <div v-if="activeTab.length == null" class="text-lg"> 
            Wähle deine Station aus.
      </div>
      <div v-for="(tabSite,tabSiteIndex) in activeTab" class="w-2/3 border-gray-500 px-24 h-full" :class="tabSiteIndex != 0 ? 'border-l w-1/2' : ''">
        <h2 class="text-xl italic mb-4">{{ tabSite }}</h2>
        <div class="flex items-center text-base justify-between text-black px-4">
            <span >Tisch</span>
            <span >Kellner</span>
            <span >Eingegangen um</span>
        </div>
        <ScrollArea scrollType="always" class="h-[70vh]">
          <div v-for="(order, orderIndex) in orders[tabSite]" :key="orderIndex" class="py-2   ">
              <button 
                  @click= "changetime(activeTab, orderIndex)"
                  class="border border-black w-full"
                  :class="order.state ? 'bg-primary ' : ''"

              >
              <div class="items-center justify-between py px-6 flex">
                  <span> {{ order.table }} </span>
                  <span> {{ order.waiter }} </span>
                  <span> {{ order.time }} </span>
              </div>
              </button>
              <div v-for="(itemName, itemIndex) in order.orderlist" >
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
            <div class="text-center py-3">
              Keine weitere Bestellungen . . .
            </div>
        <ScrollBar orientation="vertical" />
        </ScrollArea>
        </div>

      <!-- Right Panel -->
      <!-- <div class="w-1/2 flex items-center justify-center text-gray-500">
        <p>Platzhalter für zukünftige Inhalte</p>
      </div> -->
    </div>

    <!-- Footer -->
     <Popover>
        <PopoverTrigger class="fixed right-2 bottom-2 text-white py-2" >
            <!-- <div class="fixed right-2 bottom-2 text-white py-2"> -->
              <button class="px-4 py-2 bg-gray-800 rounded">Verlauf anzeigen</button>
            <!-- </div> -->
        </PopoverTrigger>
        <PopoverContent as-child class="bg-primary fixed ">
          test
        </PopoverContent>
     </Popover>


  </DefaultLayout>
  
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
