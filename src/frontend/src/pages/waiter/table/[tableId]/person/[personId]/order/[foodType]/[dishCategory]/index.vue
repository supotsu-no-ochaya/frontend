<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
import { DefaultLayout } from "@/layouts/default";
import { dishes } from "@/test-data/dishes.ts";
import { Button } from "@/components/ui/button";
import { LucideMinus, LucidePlus } from "lucide-vue-next";

const route = useRoute("/waiter/table/[tableId]/person/[personId]/order/[foodType]/[dishCategory]/");
const tableId = computed(() => route.params.tableId);
const personId = computed(() => route.params.personId);
const foodType = computed(() => route.params.foodType);
const dishCategory = computed(() => route.params.dishCategory);

const availableDishes = computed(() => dishes[foodType.value].categories[dishCategory.value].elements);
</script>

<template>
  <DefaultLayout show-navigation-footer>
    <div class="grid grid-cols-2 p-2 gap-2">
      <template v-for="dish in availableDishes">
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
          <div>
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
