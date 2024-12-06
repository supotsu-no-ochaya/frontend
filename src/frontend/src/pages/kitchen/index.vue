<script setup>
import DefaultLayout from '@/layouts/default/DefaultLayout.vue';
import { computed, reactive, ref, onMounted, watch } from 'vue';

import { ScrollBar, ScrollArea } from "@/components/ui/scroll-area"
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@/components/ui/table';

// Tabs and Orders
const foodstations = reactive(['Crepes', 'Sandwiches', 'Heißgetränke', 'Kaltgetränke',"Essen 2"]);
const activeFoodStations = ref([foodstations[0]]);
const MAX_ACTIVE_STATIONS = 2;

const allOrders = reactive({
  Crepes: [
    { id: '0', table: '2', waiter: 'Lea', time: '16:03 Uhr' , state: false, allclicked: false,
      orderlist: ['nutella', 'nutella', 'Käseschinken'],
      clicked: [false,false,false]},

    { id: '1', table: '3', waiter: 'Sylvie', time: '16:07 Uhr', state: false , orderlist: ['Zucker & Zimt', 'nutella', 'Käseschinken', 'Zucker'], allclicked: false, clicked: [false,false,false,false]},
    { id: '2', table: '3', waiter: 'Sylvie', time: '16:07 Uhr', state: false , orderlist: ['Zucker & Zimt', 'nutella', 'Käseschinken', 'Zucker'], allclicked: false, clicked: [false,false,false,false]},
    { id: '3', table: '3', waiter: 'Sylvie', time: '16:07 Uhr', state: false , orderlist: ['Zucker & Zimt', 'nutella', 'Käseschinken', 'Zucker'], allclicked: false, clicked: [false,false,false,false]},
    { id: '5', table: '3', waiter: 'Sylvie', time: '16:07 Uhr', state: false , orderlist: ['Zucker & Zimt', 'nutella', 'Käseschinken', 'Zucker'], allclicked: false, clicked: [false,false,false,false]},
    { id: '6', table: '3', waiter: 'Sylvie', time: '16:07 Uhr', state: false , orderlist: ['Zucker & Zimt', 'nutella', 'Käseschinken', 'Zucker'], allclicked: false, clicked: [false,false,false,false]},
    { id: '9', table: '3', waiter: 'Sylvie', time: '16:07 Uhr', state: false , orderlist: ['Zucker & Zimt', 'nutella', 'Käseschinken', 'Zucker'], allclicked: false, clicked: [false,false,false,false]},
    { id: '11', table: '3', waiter: 'Sylvie', time: '16:07 Uhr', state: false , orderlist: ['Zucker & Zimt', 'nutella', 'Käseschinken', 'Zucker'], allclicked: false, clicked: [false,false,false,false]},
    { id: '4', table: '3', waiter: 'Sylvie', time: '16:07 Uhr', state: false , orderlist: ['Zucker & Zimt', 'nutella', 'Käseschinken',], allclicked: false, clicked: [false,false,false,false]},
    { id: '8', table: '3', waiter: 'Sylvie', time: '16:07 Uhr', state: false , orderlist: ['Zucker & Zimt',  'Käseschinken', 'Zucker'], allclicked: false, clicked: [false,false,false,false]},
    { id: '10', table: '3', waiter: 'Sylvie', time: '16:07 Uhr', state: false , orderlist: [ 'nutella', 'Käseschinken', 'Zucker'], allclicked: false, clicked: [false,false,false,false]},
    { id: '7', table: '3', waiter: 'Sylvie', time: '16:07 Uhr', state: false , orderlist: ['Zucker & Zimt', 'nutella', 'Zucker'], allclicked: false, clicked: [false,false,false,false]},
    { id: '12', table: '2', waiter: 'Lea', time: '16:03 Uhr' , state: false, orderlist: ['nutella', 'nutella', 'Käseschinken'], allclicked: false, clicked: [false,false,false]},
  ],
  Sandwiches: [
    { id: '0', table: '4', waiter: 'Martin', time: '17:89 Uhr', state: false, orderlist: ['Käse'], allclicked: false, clicked: [false]},
    { id: '1', table: '6', waiter: 'Robin', time: '14 Uhr' , state: false, orderlist: ['Käse'], allclicked: false, clicked: [false]},
  ],
  'Kaltgetränke': [],
  'Heißgetränke': [],
});

const trashcan = reactive({})
const trashlen = 4  //max length of trashcan

foodstations.forEach(stationName => {
  trashcan[stationName] = [];  // Erstelle für jede Station ein leeres Array
});

// const trashOrders = computed(() => {
//   return allOrders[]
// }
// )

for (const stationName in allOrders) {
  const stationOrders = allOrders[stationName]
  for (const order of stationOrders){
    watch(  //watching for changes in every clicked', updating allclicked
      () => order.clicked,
      (newClicked) => {
        order.allclicked = newClicked.every(state => state === true);
      },
      { deep: true }
    );
    watch(
      () => order.allclicked,
      ()=> {
        if (order.allclicked ===false){
          const index = trashcan[stationName].indexOf(order.id)
          console.log(index)
          trashcan[stationName].splice(index)
        }
        if (order.allclicked ===true){
          trashcan[stationName].unshift(order.id);
        }
        if (trashcan[stationName].length > trashlen){
          trashcan[stationName].pop() //when does this, then pop from allOrders as well     MUSS NOCH GEMACHT WERDEN
        }
        console.log("trashcan:", trashcan[stationName])
      }
    )
  }
}

const changeState = (activeTab, index) => {
  allOrders[activeTab][index].state = !allOrders[activeTab][index].state;
}
const changeAbholbereit = (activeTab, index, itemIndex) => {
  allOrders[activeTab][index].clicked[itemIndex] = !allOrders[activeTab][index].clicked[itemIndex];
  // console.log(allOrders[activeTab][index].clicked)
  // console.log(allOrders[activeTab][index].allclicked)
}
</script>

<template>
  <DefaultLayout class="flex flex-col justify-between whitespace-nowrap">
    <!-- Tab Bar -->
    <div class="flex gap-1 px-2 py-3">
      <button
        v-for="foodStationName in foodstations"
        :key="foodStationName"
        @click="() => {
          if (activeFoodStations.includes(foodStationName)) {
            activeFoodStations.splice(activeFoodStations.indexOf(foodStationName),1)
          } else if (activeFoodStations.length < MAX_ACTIVE_STATIONS) {
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
                  <TableHead v-for="entry in ['id' ,'waiter', 'time']" :key=entry class="indent-[-4rem] font-normal w-1/3" :class="entry === 'time' ? 'indent-8 text-center': ''">
                    {{ order[entry] }}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody v-for="(itemName, itemIndex) in order.orderlist" class="text-left indent-8">
                <TableRow
                  v-if="order.clicked[itemIndex]"
                  @click="changeAbholbereit(activeStation, orderIndex, itemIndex)"
                  class="justify-between"
                >
                  <TableCell class="line-through"> {{ itemName }} </TableCell>
                  <TableCell />
                  <TableCell class="text-center"> Abholbereit </TableCell>
                </TableRow>
                <TableRow v-else-if="order.state" @click="changeAbholbereit(activeStation, orderIndex, itemIndex)" class="justify-between">
                  <TableCell> {{ itemName }} </TableCell>
                  <TableCell />
                  <TableCell class="text-center"> In Bearbeitung </TableCell>
                </TableRow>
                <TableRow v-else class="justify-between">
                  <TableCell> {{ itemName }} </TableCell>
                  <TableCell />
                  <TableCell class="text-center"> Bestellt </TableCell>
                </TableRow>
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
          <PopoverContent class="bg-background opacity-90 border-amber-900 border-2 w-[40vw] h-[60vh] pr-4">
            <h1 class="font-bold"> {{ activeStation }} </h1>
            <ScrollArea class="h-[40vh]">
              <div class="sticky z-10 w-full top-0 bg-gradient-to-b from-primary to-transparent h-4"></div>
              <div v-for="trashID in trashcan[activeStation]" class="py-2 z-0">
                <Table v-for="(order, orderIndex) in allOrders[activeStation]" :key="orderIndex" class="">
                  <!-- && trashcan.includes(order.id) -->
                  <TableHeader v-if="order.id === trashID">
                    <TableRow class="border bg-primary border-black w-full"
                    >
                      <TableHead v-for="entry in ['id' ,'waiter', 'time']" :key=entry class="indent-[-4rem] font-normal w-1/3" :class="entry === 'time' ? 'indent-8 text-center': ''">
                        {{ order[entry] }}
                      </TableHead>
                      <!-- <TableHead> h {{ order.id}} t {{orderID}} s {{ trashcan[activeStation] }} </TableHead> -->
                    </TableRow>
                  </TableHeader>
                  <TableBody v-if="order.id === trashID" v-for="(itemName, itemIndex) in order.orderlist" class="text-left indent-8">
                    <TableRow
                      @click="changeAbholbereit(activeStation, orderIndex, itemIndex)" class=" justify-between pt-2 cursor-pointer">
                      <TableCell class="line-through"> {{ itemName }} </TableCell>
                      <TableCell />
                      <TableCell class="text-center"> Abholbereit </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div class="sticky bottom-[-2px] bg-gradient-to-t from-primary to-transparent h-16"></div>
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  </DefaultLayout>
</template>
