<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
import { DefaultLayout } from "@/layouts/default";

const route = useRoute("/waiter/table/[tableId]/order");
const tableId = computed(() => route.params.tableId);
</script>

<template>
  <DefaultLayout footer="waiter-nav">
    Current Order
  </DefaultLayout>
</template>
