<script setup lang="ts">
import { DefaultLayout } from "@/layouts/default";
import { ref } from "vue";
import WaiterControlHeader from "@/components/waiter/WaiterControlHeader.vue";

const tischFrei = false; //TODO keine Personen und bezahlt
const tischBezahlt = true;//TODO
const tischTimer = true;//TODO

const nTables = ref(12);
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
        </router-link>
      </template>
    </div>
  </DefaultLayout>
</template>
