<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
import { DefaultLayout } from "@/layouts/default";
import { dishes } from "@/test-data/dishes.ts";
import { Button } from "@/components/ui/button";
import WaiterControlHeader from "@/components/waiter/WaiterControlHeader.vue";

const route = useRoute("/waiter/table/[tableId]/person/[personId]/order/");
const tableId = computed(() => route.params.tableId);
const personId = computed(() => route.params.personId);
</script>

<template>
  <DefaultLayout footer="waiter-nav">
    <WaiterControlHeader label="Essen Kategorien" icon="cutlery" />
    <div class="flex flex-col flex-1 gap-2 p-2">
      <template v-for="[foodType, details] in Object.entries(dishes)">
        <router-link class="group" :to="{ name: '/waiter/table/[tableId]/person/[personId]/order/[foodType]/', params: { tableId, personId, foodType } }">
          <Button class="w-full flex gap-2 group-even:flex-row-reverse">
            <img class="h-full" :src="details.iconSrc" :alt="details.label" />
            <div class="grow" />
            <div class="text-2xl">
              {{ details.label }}
            </div>
          </Button>
        </router-link>
      </template>
    </div>
  </DefaultLayout>
</template>
