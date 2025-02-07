<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
import { DefaultLayout } from "@/layouts/default";
import { Button } from "@/components/ui/button";
import { LucideMinus, LucidePlus, LucideShirt } from "lucide-vue-next";
import { useTableStore } from "@/components/TableInfo.js";
import WaiterControlHeader from "@/components/waiter/WaiterControlHeader.vue";
import { lockedStore } from "@/components/cart.js";

// Setup route and table store
const route = useRoute();
const tableId = computed(() => route.params.tableId); // Reactive tableId
const tableStore = useTableStore();
const personsLocked = lockedStore.noCart.filter(combo=>combo.table==tableId.value).map(combo=> parseInt(combo.person)); //TODO

console.log("here", lockedStore.noCart, personsLocked, tableStore.table.persons[tableId.value]);

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

const removePersonSecure = (tableId) => {
  const personsAtTable = tableStore.table.persons[tableId]
  console.log(personsAtTable, personsLocked, Math.max(...personsLocked))
  if ((personsAtTable-1) >= Math.max(...personsLocked)){
    removePerson(tableId)
  } else {
    alert("Person is noch in Bedienung")
  }
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
          class="mx-auto" :class="personsLocked.includes(personId) ? 'text-red-600' : ''"
          :to="{ name: '/waiter/table/[tableId]/person/[personId]/order/', params: { tableId, personId } }"
        >
          <div class="relative size-20">
            <div class="absolute inset-2">
              <LucideShirt class="size-full" :stroke-width="2" />
            </div>
            <span class="absolute inset-2 grid place-content-center font-bold">
              <div>
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
      <Button size="icon" @click="removePersonSecure(tableId)">
        <LucideMinus class="size-10" />
      </Button>
      <Button size="icon" @click="addPerson(tableId)">
        <LucidePlus class="size-10" />
      </Button>
    </div>
  </DefaultLayout>
</template>
