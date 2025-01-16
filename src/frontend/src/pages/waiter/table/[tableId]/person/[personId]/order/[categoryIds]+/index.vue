<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
import { DefaultLayout } from "@/layouts/default";
import { Button } from "@/components/ui/button";
import WaiterControlHeader from "@/components/waiter/WaiterControlHeader.vue";
import { computedAsync } from "@vueuse/core";
import { menuCategService } from "@/services/menu/menuCategService.ts";
import { menuItemService } from "@/services/menu/menuItemService.ts";
import { LucideMinus, LucidePlus } from "lucide-vue-next";

const route = useRoute("/waiter/table/[tableId]/person/[personId]/order/[categoryIds]+/");
const tableId = computed(() => route.params.tableId);
const personId = computed(() => route.params.personId);
const categoryIds = computed(() => route.params.categoryIds);

const category = computedAsync(async () => {
  return await menuCategService.getById(categoryIds.value[categoryIds.value.length - 1]);
});

const subCategories = computedAsync(async () => {
  if (!category.value) return null;
  return await menuCategService.getByParentCategoryID(category.value.id);
});

const menuItems = computedAsync(async () => {
  if (!category.value) return null;
  return await menuItemService.getAllMenuItemsWithCategoryID(category.value.id);
});
</script>

<template>
  <DefaultLayout footer="waiter-nav" v-if="category">
    <WaiterControlHeader :label="category.name" icon="cutlery" />
    <div class="flex flex-col flex-1 gap-2 p-2">
      <template v-if="subCategories !== null" v-for="subCategory in subCategories">
        <router-link class="group" :to="{ name: '/waiter/table/[tableId]/person/[personId]/order/[categoryIds]+/', params: { tableId, personId, categoryIds: [...categoryIds, subCategory.id] } }">
          <Button class="w-full flex gap-2 group-even:flex-row-reverse">
<!--            <img class="h-full" :src="subCategory.iconSrc" :alt="subCategory.name" />-->
            <div class="grow" />
            <div class="text-2xl">
              {{ subCategory.name }}
            </div>
          </Button>
        </router-link>
      </template>
    </div>
    <div class="grid grid-cols-2 p-2 gap-2">
      <template v-for="menuItem in menuItems">
        <div class="bg-primary rounded-xl mt-5">
<!--          <img class="mx-auto px-6 py-2 w-3/5 bg-background rounded-xl -mt-5" :src="menuItem.iconSrc" :alt="menuItem.name" />-->
          <div class="flex justify-evenly px-1 py-2">
            <Button size="icon" class="bg-background">
              <LucideMinus />
            </Button>
            <div class="bg-background rounded-xl min-w-8 grid place-content-center">
              {{ 0 }}
            </div>
            <Button size="icon" class="bg-background">
              <LucidePlus />
            </Button>
          </div>
          <div class="truncate text-xl px-1">
            {{ menuItem.name }}
          </div>
          <div class="text-sm px-1">
            {{ menuItem.price.toFixed(2) }}€
          </div>
        </div>
      </template>
    </div>
  </DefaultLayout>
</template>
