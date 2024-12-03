<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const tableId = computed(() => route.params.tableId);
const dishCategory = computed(() => route.params.dishCategory);
</script>

<template>

</template>
