<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
import { DefaultLayout } from "@/layouts/default";
import { dishes } from "@/test-data/dishes.ts";
import { Button } from "@/components/ui/button";

const route = useRoute("/waiter/table/[tableId]/person/[personId]/order/[foodType]/");
const tableId = computed(() => route.params.tableId);
const personId = computed(() => route.params.personId);
const foodType = computed(() => route.params.foodType);

const dishCategories = computed(() => dishes[foodType.value].categories);
</script>

<template>
  <DefaultLayout show-navigation-footer>
    <div class="flex flex-col flex-1 gap-2 p-2">
      <template v-for="[dishCategory, details] in Object.entries(dishCategories)">
        <router-link :to="{ name: '/waiter/table/[tableId]/person/[personId]/order/[foodType]/[dishCategory]/', params: { tableId, personId, foodType, dishCategory } }">
          <Button class="w-full">
            {{ details.label }}
          </Button>
        </router-link>
      </template>
    </div>
  </DefaultLayout>
</template>
