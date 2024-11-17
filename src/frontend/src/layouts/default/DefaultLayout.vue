<script setup lang="ts">
import Footer from "./_Footer.vue";
import Header from "./_Header.vue";
import type {HTMLAttributes} from "vue";

const props = defineProps<{
  class?: HTMLAttributes['class']
}>();
</script>

<template>
  <div class="h-full grid grid-rows-[auto,1fr,auto]">
    <Header />
    <main :class="props.class">
      <slot />
    </main>
    <Footer />
  </div>
</template>
