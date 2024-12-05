<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
import { DefaultLayout } from "@/layouts/default";

const route = useRoute("/waiter/table/[tableId]/person/[personId]/order/[foodType]/");
const tableId = computed(() => route.params.tableId);
const personId = computed(() => route.params.personId);
</script>

<template>
  <DefaultLayout show-navigation-footer>
    Food Category
  </DefaultLayout>
</template>
