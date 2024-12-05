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
        <div class="bg-primary rounded-lg">
          <div class="flex justify-evenly items-baseline">
            <Button size="icon">
              <LucideMinus />
            </Button>
            <div>
              {{ 0 }}
            </div>
            <Button size="icon">
              <LucidePlus />
            </Button>
          </div>
          <div class="truncate text-xl">
            {{ dish.label }}
          </div>
          <div class="text-sm">
            {{ dish.price.toFixed(2) }}€
          </div>
        </div>
      </template>
    </div>
  </DefaultLayout>
</template>
