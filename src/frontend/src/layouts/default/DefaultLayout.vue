<script setup lang="ts">
import { useRouter } from "vue-router";
import { type HTMLAttributes } from "vue";
import logoSrc from "@/assets/logo.png";
import WaiterNavFooter from "@/components/waiter/WaiterNavFooter.vue";
import { authService } from "@/services/user/authService";
import { LucideLogOut } from "lucide-vue-next";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { onMounted } from 'vue';

const router = useRouter();

onMounted(() => {
  if (authService.isLoggedIn()){
    console.log("logged in")
  } else {
    console.log("logged out")
    router.push("/auth/login")
  }

})

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
    <header class="sticky top-0 z-10 flex items-center p-2 gap-x-2 bg-gradient-to-b from-primary via-primary to-transparent">
      <img :src="logoSrc" alt="logo" class="block rounded-full size-12" />
      <p>
        Supotso no Ochaya
      </p>
      <div class="grow" />

      <AlertDialog>
        <AlertDialogTrigger>
          <LucideLogOut class="size-8" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle> Möchten Sie sich ausloggen? </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Nein</AlertDialogCancel>
            <AlertDialogAction @click="router.push('/auth/logout')">Ja</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
    <main :class="props.class">
      <slot />
    </main>
    <footer class="sticky bottom-0 z-10 border-t bg-background">
      <div v-if="footer" class="flex gap-2 justify-around items-baseline p-2">
        <component :is="footers[footer]" />
      </div>
    </footer>
  </div>
</template>
