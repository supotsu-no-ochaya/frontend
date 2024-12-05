<script setup lang="ts">
import { DefaultLayout } from "@/layouts/default";
import { ref } from "vue";
import WaiterControlHeader from "@/components/waiter/WaiterControlHeader.vue";

const nTables = ref(12);
</script>

<template>
  <DefaultLayout>
    <WaiterControlHeader label="Tische" icon="cutlery" />
    <div class="flex flex-1 flex-wrap justify-around items-baseline gap-5 p-2">
      <template v-for="tableId in nTables" :key="tableId">
        <router-link :to="{ name: '/waiter/table/[tableId]/', params: { tableId } }">
          <div class="grid place-content-center size-20 bg-primary rounded-full">
            {{ tableId }}
          </div>
        </router-link>
      </template>
    </div>
  </DefaultLayout>
</template>
