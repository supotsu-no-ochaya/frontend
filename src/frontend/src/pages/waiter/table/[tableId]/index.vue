<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
import { DefaultLayout } from "@/layouts/default";
import { Button } from "@/components/ui/button";
import { LucideMinus, LucidePlus, LucideShirt } from "lucide-vue-next";
import { useTableStore } from "@/components/TableInfo.js";
import WaiterControlHeader from "@/components/waiter/WaiterControlHeader.vue";

// Setup route and table store
const route = useRoute();
const tableId = computed(() => route.params.tableId); // Reactive tableId
const tableStore = useTableStore();
const personBezahlt = true; //TODO

// Add a person to the table (increment count)
const addPerson = (table) => {
  tableStore.addPerson(table);
};

// Remove a person from the table (decrement count)
const removePerson = (table) => {
  tableStore.removePerson(table);
};

// Ensure the table is initialized in the store when this component is loaded
if (!tableStore.table.persons[tableId.value]) {
  addPerson(tableId.value);
}

</script>

<template>
  <DefaultLayout footer="waiter-nav" class="flex flex-col p-2">
    <!-- Table Header -->
    <WaiterControlHeader :label="`Tisch ${tableId}`" icon="cutlery" />

    <!-- Display People at the Table -->
    <div class="grid grid-cols-[repeat(auto-fill,minmax(6rem,1fr))] gap-5 p-2">
      <template v-for="personId in tableStore.table.persons[tableId]" :key="personId">
        <router-link
          class="mx-auto"
          :to="{ name: '/waiter/table/[tableId]/person/[personId]/order/', params: { tableId, personId } }"
        >
          <div class="relative size-20">
            <div class="absolute inset-2">
              <LucideShirt class="size-full" />
            </div>
            <span class="absolute inset-2 grid place-content-center font-bold">
              <div class="":class="personBezahlt ? '' : 'text-red-500'">
                {{ personId }}
              </div>
            </span>
          </div>
        </router-link>
      </template>
    </div>

    <!-- Spacer -->
    <div class="grow" />

    <!-- Controls for Adding/Removing People -->
    <div class="flex justify-evenly items-stretch gap-2">
      <Button size="icon" @click="removePerson(tableId)">
        <LucideMinus class="size-10" />
      </Button>
      <Button size="icon" @click="addPerson(tableId)">
        <LucidePlus class="size-10" />
      </Button>
    </div>
  </DefaultLayout>
</template>
