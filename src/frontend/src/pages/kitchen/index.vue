<script setup lang="ts">
import DefaultLayout from '@/layouts/default/DefaultLayout.vue';
import { reactive, ref, watch } from 'vue';

import { ScrollBar, ScrollArea } from "@/components/ui/scroll-area"
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@/components/ui/table';

import { allStationnames, allOrders, type Order, type AllOrders, trashcan } from "@/stores/orders"
import type { WatchHandle } from "vue";
import { orderService } from '@/services/order/orderService';
import { OrderStatus } from '@/interfaces/order/Order';
import { orderItemService } from '@/services/order/orderItemService';



//* MUTABLE
const maxActiveStations = 2;  //number of displayed stations at a time
const trashlength = 4  //max length of trashcan
// MUTABLE //


const activeFoodStations = reactive<string[]>([]);

const manualWatchers: WatchHandle[] = [];

 //look for changes in allOders (when new Order arrives)
watch(
  () => allOrders,
  (newOrders) => {
    for (const manualWatcher of manualWatchers) {
      manualWatcher.stop();
    }

    for (const stationName in newOrders) {
      const stationOrders = newOrders[stationName];
      //going over every order in all categories
      for (const order of stationOrders) {
        //look for changes in orderlist (clicked or notes)
        manualWatchers.push(watch(
        () => order.orderlist,
        (newOrderlist) => {
          //updating allclicked
          order.allclicked = newOrderlist.every((item) => item.clicked);
          },
          { deep: true }
        ));
        // when allclicked changes -> add order to trashcan / history
        manualWatchers.push(watch( 
          () => order.allclicked,
          () => {
            if (order.allclicked === false) {
              const index = trashcan[stationName].indexOf(order.id);
              if (index !== -1) {
                //rmve from trashcan, when not all 'abholbereit' (!allclicked)
                trashcan[stationName].splice(index, 1);
              }
              orderService.updateOrderToStatus(order.id, OrderStatus.InArbeit)
            }
            if (order.allclicked === true) {
              console.log("trashcan", trashcan)
              if (!trashcan[stationName].includes(order.id)) {
                //add orderID as first El to trashcan
                trashcan[stationName].unshift(order.id);
              }
              orderService.updateOrderToStatus(order.id, OrderStatus.Geliefert)
            }
            if (trashcan[stationName].length > trashlength) {
              //rmve x+1 el of trashcan
              const removedOrderId = trashcan[stationName].pop
              const removedOrderIndex = stationOrders.findIndex(
                (order) => order.id === removedOrderId
              );
              if (removedOrderIndex !== -1) {
                //rmve completed order from allOrders
                stationOrders.splice(removedOrderIndex, 1);
              }
            }
          }
        ));
      }
    }
  },
  { deep: true, immediate: true }
);

const changeState = (activeStation: string, orderIndex: number) => {
    allOrders[activeStation][orderIndex].state = !allOrders[activeStation][orderIndex].state;
}
const changeAbholbereit = (activeTab: string, orderIndex: number, itemIndex: number) => {
    allOrders[activeTab][orderIndex].orderlist[itemIndex].clicked = !allOrders[activeTab][orderIndex].orderlist[itemIndex].clicked;
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
            activeFoodStations.shift();  // TODO maybe Array.pop()
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
      <div v-for="_ in allStationnames"></div>
      <!-- Header declaring the station -->
      <div v-for="(activeStation, activeStationIndex) in activeFoodStations"
        class="w-1/2 h-full border-gray-500 px-[8vw]"
        :class="activeStationIndex !== 0 ? 'border-l' : ''">
        <h2 class="text-xl italic mb-4 text-center">{{ activeStation }}</h2>
        <Table v-if="allOrders[activeStation].length">
          <TableBody>
            <TableRow class="text-base whitespace-nowrap">
              <TableCell v-for="list_entry in ['Tisch' , 'Kellner', 'Eingegangen um']"
                class="indent-[-4rem] text-center w-1/3"
                :class="list_entry === 'Eingegangen um' ? 'text-center indent-0' : ''">
                {{ list_entry }}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <!-- Orders toDo -->
        <ScrollArea class="h-[65vh]">
          <div class="sticky z-10 top-0 bg-gradient-to-b from-background to-transparent h-4 pointer-events-none"></div>
          <template v-for="(order, orderIndex) in allOrders[activeStation]" :key="orderIndex" class="z-0">
            <Table v-if="!order.allclicked" class="my-2 cursor-pointer text-wrap">
                <TableHeader>
                  <TableRow
                    @click="changeState(activeStation, orderIndex)"
                    class="border border-black"
                    :class="order.state ? 'bg-primary' : ''"
                  >
                  <TableHead v-for="entry in Array.of<keyof Order>('table' ,'waiter', 'time')" :key=entry class="indent-[-4rem] font-normal w-1/3" :class="entry === 'time' ? 'indent-0 text-center': ''">
                    {{ order[entry] }}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody class="text-left">
                <template v-for="(item, itemIndex) in order.orderlist">
                  <TableRow
                    v-if="item.clicked"
                    @click="changeAbholbereit(activeStation, orderIndex, itemIndex)"
                    class="justify-between"
                  >
                    <TableCell colspan="2" class="line-through pl-4"> {{ item.name }} </TableCell>
                    <TableCell class="text-center"> Abholbereit </TableCell>
                  </TableRow>
                  <TableRow v-else-if="order.state" @click="changeAbholbereit(activeStation, orderIndex, itemIndex)" class="justify-between">
                    <TableCell colspan="2" class="pl-4"> {{ item.name }} </TableCell>
                    <TableCell class="text-center"> In Bearbeitung </TableCell>
                  </TableRow>
                  <TableRow v-else class="justify-between">
                    <TableCell colspan="2" class="pl-4"> {{ item.name }} </TableCell>
                    <TableCell class="text-center"> Bestellt </TableCell>
                  </TableRow>
                  <TableRow v-if="item.notes">
                    <TableCell colspan="2" class="indent-0 pl-10 text-xs italic relative before:absolute before:left-8 before:content-['_-_']">
                      {{ item.notes }}
                    </TableCell>
                  </TableRow>
                </template>
              </TableBody>
            </Table>
          </template>
          <div v-if="allOrders[activeStation].length" class="text-center py-3">
            Keine weitere Bestellungen . . .
          </div>
          <div v-else class="text-center">
            Warte auf Bestellung . . .
          </div>
          <div class="sticky bottom-[-2px] bg-gradient-to-t from-background to-transparent h-16 pointer-events-none"></div>
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
              <div class="sticky z-10 w-full top-0 bg-gradient-to-b from-background to-transparent h-4 pointer-events-none"></div>
              <div v-for="trashID in trashcan[activeStation]" class="py-2 z-0">
                <Table v-for="(order, orderIndex) in allOrders[activeStation]" :key="orderIndex" class="">
                    <TableHeader v-if="order.id === trashID">
                      <TableRow class="border bg-primary border-black w-full"
                      >
                      <!-- ToDo: maybe declare entry in the script -->
                      <TableHead
                        v-for="entry in Array.of<keyof Order>('table' ,'waiter', 'time')" 
                        :key=entry
                        class="indent-[-4rem] font-normal w-1/3"
                        :class="entry === 'time' ? 'indent-0 text-center': ''"
                        > 
                        {{ order[entry] }}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody class="text-left">
                    <template v-if="order.id === trashID" v-for="(item, itemIndex) in order.orderlist" >
                      <TableRow
                        @click="changeAbholbereit(activeStation, orderIndex, itemIndex)" class=" justify-between pt-2 cursor-pointer">
                        <TableCell colspan="2" class="line-through pl-4"> {{ item.name }} </TableCell>
                        <TableCell class="text-center"> Abholbereit </TableCell>
                      </TableRow>
                      <TableRow v-if="item.notes">
                        <TableCell colspan="2" class="indent-0 text-xs italic pl-10 relative before:absolute before:left-8 before:content-['_-_']">
                          {{ item.notes }}
                        </TableCell>
                      </TableRow>
                    </template>
                  </TableBody>
                </Table>
              </div>
              <div class="sticky bottom-[-2px] bg-gradient-to-t from-background to-transparent h-16 pointer-events-none"></div>
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  </DefaultLayout>
</template>
