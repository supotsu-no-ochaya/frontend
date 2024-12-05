<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
import { DefaultLayout } from "@/layouts/default";
import { dishes } from "@/test-data/dishes.ts";
import { Button } from "@/components/ui/button";
import { LucideMinus, LucidePlus } from "lucide-vue-next";
import WaiterControlHeader from "@/components/waiter/WaiterControlHeader.vue";

const route = useRoute("/waiter/table/[tableId]/person/[personId]/order/[foodType]/[dishCategory]/");
const tableId = computed(() => route.params.tableId);
const personId = computed(() => route.params.personId);
const foodType = computed(() => route.params.foodType);
const dishCategoryId = computed(() => route.params.dishCategory);

const foodCategory = computed(() => dishes[foodType.value])
const dishCategory = computed(() => foodCategory.value.categories[dishCategoryId.value])
</script>

<template>
  <DefaultLayout footer="waiter-nav">
    <WaiterControlHeader :label="`${foodCategory.label}/${dishCategory.label}`" icon="cutlery" />
    <div class="grid grid-cols-2 p-2 gap-2">
      <template v-for="dish in dishCategory.elements">
        <div class="bg-primary rounded-xl mt-5">
          <img class="mx-auto px-6 py-2 w-3/5 bg-background rounded-xl -mt-5" :src="dish.iconSrc" :alt="dish.label" />
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
            {{ dish.label }}
          </div>
          <div class="text-sm px-1">
            {{ dish.price.toFixed(2) }}€
          </div>
        </div>
      </template>
    </div>
  </DefaultLayout>
</template>
