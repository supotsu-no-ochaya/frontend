<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed, reactive } from "vue";
import { DefaultLayout } from "@/layouts/default";
import { Button } from "@/components/ui/button";
import { LucideMinus, LucidePlus, LucideShirt } from "lucide-vue-next";
import { useTableStore} from "@/components/TableInfo.js";
import WaiterControlHeader from "@/components/waiter/WaiterControlHeader.vue";

const route = useRoute("/waiter/table/[tableId]/");
const tableId = computed(() => route.params.tableId);
const tableStore = useTableStore();

const addPerson = (table) => {
  tableStore.addPerson(table);
};

const removePerson = (table) => {
  tableStore.removePerson(table);
};


if (tableStore.table[tableId.value] === undefined){
  addPerson(tableId.value)
}

</script>

<template>
  <DefaultLayout footer="waiter-nav" class="flex flex-col p-2">
    <WaiterControlHeader :label="`Tisch ${tableId}`" icon="cutlery" />
    <div class="grid grid-cols-[repeat(auto-fill,minmax(6rem,1fr))] gap-5 p-2">
     <template v-for="personId in tableStore.table[tableId]" :key="personId">
        <router-link class="mx-auto" :to="{ name: '/waiter/table/[tableId]/person/[personId]/order/', params: { tableId, personId } }">
          <div class="relative size-20">
            <div class="absolute inset-2">
              <LucideShirt class="size-full" />
            </div>
            <span class="absolute inset-2 grid place-content-center font-bold">
              {{ personId }}
            </span>
          </div>
        </router-link>
      </template>
    </div>
    <div class="grow" />
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
