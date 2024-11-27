<script setup lang="ts">
import type {HTMLAttributes} from "vue";
import logoSrc from "@/assets/logo.png";

const props = defineProps<{
  class?: HTMLAttributes['class']
}>();
</script>

<template>
  <div class="min-h-screen grid grid-rows-[auto,1fr,auto]">
    <header class="flex items-center p-2 gap-x-2 bg-gradient-to-b from-primary to-background">
      <img :src="logoSrc" alt="logo" class="block rounded-full size-12" />
      <p>
        Supotso no Ochaya
      </p>
      <div class="grow" />
    </header>
    <main :class="props.class">
      <slot />
    </main>
    <footer>

    </footer>
  </div>
</template>
