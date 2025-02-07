<script setup lang="ts">
import { DefaultLayout } from "@/layouts/default";
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";
import { useTableStore } from "@/components/TableInfo";
import WaiterControlHeader from "@/components/waiter/WaiterControlHeader.vue";
import { lockedStore } from "@/components/cart.js";


const tableStore = reactive(useTableStore());
const nTables = ref(12);

const tablesLocked = ref([])
for (let tableId = 0; tableId < nTables.value; tableId++){
  if (lockedStore.noCart.find(combo=>parseInt(combo.table)==tableId)){
    tablesLocked.value.push(tableId)
  }
}

if (tableStore.table.timers === undefined) {
  tableStore.table.timers = [];
}

if (tableStore.table.persons === undefined) {
  tableStore.table.persons = [];
}

if (tableStore.table.tableEmpty === undefined) {
  tableStore.table.tableEmpty = [];
}

// Initialize timers if they don't exist
if (tableStore.table.timers.length === 0) {
  for (let i = 0; i < nTables.value; i++) {
    tableStore.table.timers.push(null);
  }
}

// Initialize tableEmpty if they don't exist
if (tableStore.table.tableEmpty.length === 0) {
  for (let i = 0; i < nTables.value; i++) {
    tableStore.table.tableEmpty.push(true);
  }
}

// Function to format time as minutes:seconds
const formatTime = (elapsedTime: number) => {
  const totalSeconds = Math.floor(elapsedTime / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  return `${minutes}`
  //const seconds = totalSeconds % 60;
  //return `${minutes}:${seconds.toString().padStart(2, '0')}`; // Ensures 2-digit seconds
};

// Function to update timers periodically
const updateTimers = () => {
  setInterval(() => {
    tableStore.table.timers = [...tableStore.table.timers]; // Trigger reactivity update
  }, 1000);
};

// Start the interval on component mount
onMounted(() => {
  updateTimers();
});

// Clear the interval before the component is destroyed
onBeforeUnmount(() => {
  clearInterval(updateTimers);
});
</script>

<template>
  <DefaultLayout>
    <WaiterControlHeader label="Tische" icon="cutlery" />
    <div class="grid grid-cols-[repeat(auto-fill,minmax(6rem,1fr))] gap-5 p-2">
      <template v-for="tableId in nTables" :key="tableId">
        <router-link class="mx-auto flex flex-col items-center"
                     :to="{ name: '/waiter/table/[tableId]/', params: { tableId } }">
          <!-- Table Circle -->
            <div class="w-20 h-20 grid place-content-center size-20 rounded-full"
              :class="tablesLocked.includes(tableId) ? 'bg-green-500 rounded-full' : 'bg-primary'">
              <div>
                {{ tableId }}
              </div>
          </div>
          <!-- Timer Text (Centered Below the Circle) -->
          <div class="text-xs h-6 w-full text-center">
            <template v-if="tableStore.table.timers[tableId-1] !== null">
              {{ formatTime((new Date()).getTime() - tableStore.table.timers[tableId-1]) }} min
            </template>
            <template v-else>
              <span class="opacity-0"> 0:00</span> <!-- Invisible placeholder for alignment -->
            </template>
          </div>
        </router-link>
      </template>
    </div>
  </DefaultLayout>
</template>
