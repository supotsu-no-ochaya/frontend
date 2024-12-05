<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed, reactive } from "vue";
import { DefaultLayout } from "@/layouts/default";
import { Button } from "@/components/ui/button";
import { LucideMinus, LucidePlus, LucideShirt } from "lucide-vue-next";
import WaiterControlHeader from "@/components/waiter/WaiterControlHeader.vue";

const route = useRoute("/waiter/table/[tableId]/");
const tableId = computed(() => route.params.tableId);

const tableData = reactive(({
  nPeople: 1
}));
</script>

<template>
  <DefaultLayout footer="waiter-nav" class="flex flex-col p-2">
    <WaiterControlHeader :label="`Tisch ${tableId}`" icon="cutlery" />
    <div class="flex flex-1 flex-wrap justify-around items-baseline gap-5 p-2">
      <template v-for="personId in tableData.nPeople" :key="personId">
        <router-link :to="{ name: '/waiter/table/[tableId]/person/[personId]/order/', params: { tableId, personId } }">
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
      <Button size="icon" :disabled="tableData.nPeople <= 1" @click="tableData.nPeople--">
        <LucideMinus class="size-10" />
      </Button>
      <Button size="icon" @click="tableData.nPeople++">
        <LucidePlus class="size-10" />
      </Button>
    </div>
  </DefaultLayout>
</template>
