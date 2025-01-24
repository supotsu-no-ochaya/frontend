<script setup lang="ts">
import { type HTMLAttributes } from "vue";
import logoSrc from "@/assets/logo.png";
import WaiterNavFooter from "@/components/waiter/WaiterNavFooter.vue";
import { authService } from "@/services/user/authService";
import { useRouter } from "vue-router";

const router = useRouter();

const footers = {
  "waiter-nav": WaiterNavFooter,
}

const props = defineProps<{
  class?: HTMLAttributes['class']
  footer?: keyof typeof footers;
}>();

</script>

<template>
  <div class="min-h-screen grid grid-rows-[auto,1fr,auto]">
    <header class="flex items-center p-2 gap-x-2 bg-gradient-to-b from-primary via-primary to-transparent">
      <img :src="logoSrc" alt="logo" class="block rounded-full size-12" />
      <p>
        Supotso no Ochaya
      </p>
      <div class="grow" />
      <button @click="async ()=>{authService.logout; await router.push('/auth/login')}" class="border-black border-2 rounded-md">
          Logout
      </button>
    </header>
    <main :class="props.class">
      <slot />
    </main>
    <footer class="border-t">
      <div v-if="footer" class="flex gap-2 justify-around items-baseline p-2">
        <component :is="footers[footer]" />
      </div>
    </footer>
  </div>
</template>
