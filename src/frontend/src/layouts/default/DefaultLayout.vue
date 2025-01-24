<script setup lang="ts">
import { type HTMLAttributes } from "vue";
import logoSrc from "@/assets/logo.png";
import WaiterNavFooter from "@/components/waiter/WaiterNavFooter.vue";
import { useRouter } from "vue-router";
import { LucideLogOut } from "lucide-vue-next";
import AlertDialog from "@/components/ui/alert-dialog/AlertDialog.vue";
import AlertDialogTrigger from "@/components/ui/alert-dialog/AlertDialogTrigger.vue";
import AlertDialogTitle from "@/components/ui/alert-dialog/AlertDialogTitle.vue";
import AlertDialogFooter from "@/components/ui/alert-dialog/AlertDialogFooter.vue";
import AlertDialogCancel from "@/components/ui/alert-dialog/AlertDialogCancel.vue";
import AlertDialogAction from "@/components/ui/alert-dialog/AlertDialogAction.vue";
import AlertDialogContent from "@/components/ui/alert-dialog/AlertDialogContent.vue";

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

      <AlertDialog>
        <AlertDialogTrigger>
              <LucideLogOut class="size-10" />
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
    <footer class="border-t">
      <div v-if="footer" class="flex gap-2 justify-around items-baseline p-2">
        <component :is="footers[footer]" />
      </div>
    </footer>
  </div>
</template>
