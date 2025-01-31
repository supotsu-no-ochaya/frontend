<script setup lang="ts">
import { DefaultLayout } from "@/layouts/default";
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";
import { useTableStore } from "@/components/TableInfo";
import WaiterControlHeader from "@/components/waiter/WaiterControlHeader.vue";


const tableStore = reactive(useTableStore());

const tischFrei = false; //TODO keine Personen und bezahlt
const tischBezahlt = true;//TODO
const tischTimer = true;//TODO


const nTables = ref(12);
if (tableStore.table.timers === undefined) {
  tableStore.table.timers = []
}

if (tableStore.table.persons === undefined) {
  tableStore.table.persons = []
}
// Initialize timers if they don't exist
if (tableStore.table.timers.length === 0) {
  for (let i = 0; i < nTables.value; i++) {
    tableStore.table.timers.push(null);
  }
}

// Set an interval to update the timers
const updateTimers = () => {
  setInterval(() => {
    // Trigger a reactivity update by changing any reactive data, such as a dummy value
    tableStore.table.timers = [...tableStore.table.timers];
  }, 1000); // Update every second
};

// Start the interval on component mount
onMounted(() => {
  updateTimers();
});

// Clear the interval before the component is destroyed
onBeforeUnmount(() => {
  clearInterval(updateTimers); // Clear interval when component is unmounted
});
</script>

<template>
  <DefaultLayout>
    <WaiterControlHeader label="Tische" icon="cutlery" />
    <div class="grid grid-cols-[repeat(auto-fill,minmax(6rem,1fr))] gap-5 p-2">
      <template v-for="tableId in nTables" :key="tableId">
        <router-link class="mx-auto" :to="{ name: '/waiter/table/[tableId]/', params: { tableId } }">
          <div class="w-20 h-20 grid place-content-center size-20 rounded-full"
              :class="tischFrei ? 'bg-primary': (tischBezahlt ? 'bg-green-500 rounded-full' : 'bg-orange-500 rounded-full')">
              <div class="":class="tischTimer ? '' : 'text-red-500'">
                {{ tableId }}
              </div>
          </div>
          <div v-if="tableStore.table.timers[tableId] !== null" class="text-xs">
            Timer: {{(((new Date()).getTime()-tableStore.table.timers[tableId])/(60*1000)).toFixed(1)}} Minuten
          </div>
        </router-link>
      </template>
    </div>
  </DefaultLayout>
</template>
