<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed, ref } from "vue";
import { DefaultLayout } from "@/layouts/default";
import { Button } from "@/components/ui/button";
import WaiterControlHeader from "@/components/waiter/WaiterControlHeader.vue";
import { menuCategService } from "@/services/menu/menuCategService.ts";
import type { MenuCateg } from "@/interfaces/menu/MenuCateg.ts";

const route = useRoute("/waiter/table/[tableId]/person/[personId]/order/");
const tableId = computed(() => route.params.tableId);
const personId = computed(() => route.params.personId);

const mainCategories = ref<MenuCateg[]>([]);

menuCategService.getAllMainCategories()
  .then(async (res) => mainCategories.value = res);
</script>

<template>
  <DefaultLayout footer="waiter-nav">
    <WaiterControlHeader label="Essen Kategorien" icon="cutlery" />
    <div class="flex flex-col flex-1 gap-2 p-2">
      <template v-for="mainCategory in mainCategories">
        <router-link class="group" :to="{ name: '/waiter/table/[tableId]/person/[personId]/order/[categoryIds]+/', params: { tableId, personId, categoryIds: [mainCategory.id] } }">
          <Button class="w-full flex gap-2 group-even:flex-row-reverse">
<!--            <img class="h-full" :src="mainCategory.iconSrc" :alt="mainCategory.name" />-->
            <div class="grow" />
            <div class="text-2xl">
              {{ mainCategory.name }}
            </div>
          </Button>
        </router-link>
      </template>
    </div>
  </DefaultLayout>
</template>
