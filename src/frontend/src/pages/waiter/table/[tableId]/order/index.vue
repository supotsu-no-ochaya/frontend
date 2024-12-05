<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute("/waiter/table/[tableId]/order/");
const tableId = computed(() => route.params.tableId);
</script>

<template>

</template>
