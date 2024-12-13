<script setup>

let localOrderId = 15 //ToDo: delete this var with the button in the end

import DefaultLayout from '@/layouts/default/DefaultLayout.vue';
import { computed, reactive, ref, onMounted, watch } from 'vue';

import { ScrollBar, ScrollArea } from "@/components/ui/scroll-area"
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@/components/ui/table';

import { allStationnames, allOrders, addOrder } from "@/test-data/orders.ts"

// Tabs and Orders
const activeFoodStations = ref([]);
const maxActiveStations = 2;  //number of displayed Stations at a time

const trashcan = reactive({})
const trashlength = 4  //max length of trashcan

allStationnames.forEach(stationName => {
  trashcan[stationName] = [];  // Erstelle für jede Station ein leeres Array in trashcan
});

watch(  //look for changes in allOders (when new Order arrives)
  () => allOrders,
  (newOrders) => {
    for (const stationName in newOrders) {
      const stationOrders = newOrders[stationName];
      for (const order of stationOrders) {  //going over every order in all categories

        watch(  //look for changes in orderlist (clicked or notes)
        () => order.orderlist,
        (newOrderlist) => {
            // for (const item in newOrderlist){
            order.allclicked = newOrderlist.every((item) => item.clicked); //updating allclicked
            // }
          },
          { deep: true }
        );

        watch(  // when allclicked changes -> add order to trashcan / history
          () => order.allclicked,
          () => {
            if (order.allclicked === false) {
              const index = trashcan[stationName].indexOf(order.id);
              if (index !== -1) {
                trashcan[stationName].splice(index, 1); //rmve from trashcan, when not all 'abholbereit' (!allclicked)
              }
            }
            if (order.allclicked === true) {
              if (!trashcan[stationName].includes(order.id)) {
                trashcan[stationName].unshift(order.id);  //add orderID as first El to trashcan
              }
            }
            if (trashcan[stationName].length > trashlength) {
              const removedOrderId = trashcan[stationName].pop(); //rmve x+1 el of trashcan
              const removedOrderIndex = stationOrders.findIndex(
                (order) => order.id === removedOrderId
              );
              if (removedOrderIndex !== -1) {
                stationOrders.splice(removedOrderIndex, 1); //rmve completed order from allOrders
              }
            }
          }
        );
      }
    }
  },
  { deep: true, immediate: true }
);

const changeState = (activeTab, index) => {
    allOrders[activeTab][index].state = !allOrders[activeTab][index].state;
}
const changeAbholbereit = (activeTab, orderIndex, itemIndex) => {
    allOrders[activeTab][orderIndex].orderlist[itemIndex].clicked = !allOrders[activeTab][orderIndex].orderlist[itemIndex].clicked;
    console.log('test')
}
</script>

<template>
  <DefaultLayout class="flex flex-col justify-between whitespace-nowrap">
    <!-- Tab Bar -->
    <div class="flex gap-1 px-2 py-3">
        <button
        v-for="foodStationName in allStationnames"
        :key="foodStationName"
        @click="() => {
          if (activeFoodStations.includes(foodStationName)) {
            activeFoodStations.splice(activeFoodStations.indexOf(foodStationName),1)
          } else if (activeFoodStations.length < maxActiveStations) {
            activeFoodStations.push(foodStationName)
          } else {
            activeFoodStations.shift();  // todo: maybe Array.pop()
            activeFoodStations.push(foodStationName);
          }
        }"
          class="rounded-md w-1/4 min-w-max border-amber-900 border-opacity-40 py"
          :class="activeFoodStations.includes(foodStationName)
              ? 'rounded-md  border-2 bg-primary bg-opacity-70'
              : 'bg-transparent border-b-2'"
          >
          {{ foodStationName }}
        </button>
    </div>

    <!-- Content Area -->
    <div class="flex flex-1 pt-[5vh] justify-center">
      <div v-if="activeFoodStations.length === 0" class="text-lg">
            Wähle deine Station aus.
      </div>
      <div v-for="x in allStationnames"></div>
      <!-- Header declaring the station -->
      <div v-for="(activeStation, activeStationIndex) in activeFoodStations"
        class="w-1/2 h-full border-gray-500 px-[8vw]"
        :class="activeStationIndex !== 0 ? 'border-l' : ''">
        <h2 class="text-xl italic mb-4">{{ activeStation }}</h2>
        <Table v-if="allOrders[activeStation].length">
          <TableBody>
            <TableRow class="text-base whitespace-nowrap">
              <TableCell v-for="list in ['Tisch' , 'Kellner', 'Eingegangen um']"
                class="indent-[-4rem] text-center w-1/3"
                :class="list === 'Eingegangen um' ? 'text-center indent-8' : ''">
                {{ list }}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <!-- Orders toDo -->
        <ScrollArea class="h-[65vh]">
        <div class="sticky z-10 w-full top-0 bg-gradient-to-b from-background to-transparent h-4"></div>
        <div v-for="(order, orderIndex) in allOrders[activeStation]" :key="orderIndex" class="z-0">
            <Table v-if="!order.allclicked" class="my-2 cursor-pointer">
                <TableHeader>
                  <TableRow
                    @click="changeState(activeStation, orderIndex)"
                    class="border border-black w-full"
                    :class="order.state ? 'bg-primary ' : ''"
                  >
                  <TableHead v-for="entry in ['table' ,'waiter', 'time']" :key=entry class="indent-[-4rem] font-normal w-1/3" :class="entry === 'time' ? 'indent-8 text-center': ''">
                    {{ order[entry] }}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <template v-for="(item, itemIndex) in order.orderlist" class="text-left indent-8">
                    <TableRow
                    v-if="item.clicked"
                    @click="changeAbholbereit(activeStation, orderIndex, itemIndex)"
                    class="justify-between"
                    >
                    <TableCell class="line-through"> {{ item.name }} </TableCell>
                    <TableCell />
                    <TableCell class="text-center"> Abholbereit </TableCell>
                  </TableRow>
                  <TableRow v-else-if="order.state" @click="changeAbholbereit(activeStation, orderIndex, itemIndex)" class="justify-between">
                    <TableCell> {{ item.name }} </TableCell>
                    <TableCell />
                    <TableCell class="text-center"> In Bearbeitung </TableCell>
                  </TableRow>
                  <TableRow v-else class="justify-between">
                    <TableCell> {{ item.name }} </TableCell>
                    <TableCell />
                    <TableCell class="text-center"> Bestellt </TableCell>
                  </TableRow>
                  <TableRow v-if="item.notes" class="indent-8 text-xs italic">
                    <TableCell>
                      - {{ item.notes }}
                    </TableCell>
                  </TableRow>
                </template>
              </TableBody>
            </Table>
          </div>
          <div v-if="allOrders[activeStation].length" class="text-center py-3">
            Keine weitere Bestellungen . . .
          </div>
          <div v-else class="text-center">
            Warte auf Bestellung . . .
          </div>
          <div class="sticky bottom-[-2px] bg-gradient-to-t from-background to-transparent h-16"></div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>

        <!-- show completed orders -->
        <Popover class="">
          <PopoverTrigger class="fixed bottom-2 text-white py-2" :class="activeStationIndex === 1 ? 'right-3': 'left-3'">
              <button class="px-4 py-2 bg-gray-800 rounded"> Verlauf Anzeigen </button>
          </PopoverTrigger>
          <PopoverContent class="bg-background opacity-90 border-amber-900 right-3 border-2 w-[45vw] h-[85vh] pr-4 ">
            <h1 class="font-bold"> {{ activeStation }} </h1>
            <ScrollArea class="h-[93%]">
              <div class="sticky z-10 w-full top-0 bg-gradient-to-b from-background to-transparent h-4"></div>
              <div v-for="trashID in trashcan[activeStation]" class="py-2 z-0">
                <Table v-for="(order, orderIndex) in allOrders[activeStation]" :key="orderIndex" class="">
                    <TableHeader v-if="order.id === trashID">
                      <TableRow class="border bg-primary border-black w-full"
                      >
                      <TableHead v-for="entry in ['table' ,'waiter', 'time']" :key=entry class="indent-[-4rem] font-normal w-1/3" :class="entry === 'time' ? 'indent-8 text-center': ''">
                        {{ order[entry] }}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody v-if="order.id === trashID" v-for="(item, itemIndex) in order.orderlist" class="text-left indent-8">
                    <TableRow
                    @click="changeAbholbereit(activeStation, orderIndex, itemIndex)" class=" justify-between pt-2 cursor-pointer">
                      <TableCell class="line-through"> {{ item.name }} </TableCell>
                      <TableCell />
                      <TableCell class="text-center"> Abholbereit </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div class="sticky bottom-[-2px] bg-gradient-to-t from-background to-transparent h-16"></div>
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </PopoverContent>
        </Popover>
      </div>
      <!-- <button class="px-4 py-2 fixed bottom-2 bg-gray-800 rounded"  
        @click="
        addOrder(category = 'Sandwiches', //ToDo: delete this button with the var in the start
        orderTable = localOrderId, 
        orderId = '7', 
        'Peter', 
        ['Schoki', 'Honig Nuss'], 
        'Extra Sahne');
        localOrderId++;
        console.log('trashcan', trashcan);
        console.log('allOrders', allOrders);">
          AddTestOrder 
      </button> -->
    </div>
  </DefaultLayout>
</template>
