<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import logoSrc from "@/assets/logo.png";
import { type RouteLocationRaw, useRoute } from "vue-router";

import billSrc from "@/assets/icons/navigation/bill.svg";
import homeSrc from "@/assets/icons/navigation/home.svg";
import shoppingCartSrc from "@/assets/icons/navigation/shopping-cart.svg";

const props = defineProps<{
  class?: HTMLAttributes['class']
  showNavigationFooter?: boolean
}>();

interface FooterLink {
  iconSrc: string
  alt: string
  location: RouteLocationRaw
}

const route = useRoute("/waiter/table/[tableId]/");

const footerLinks: FooterLink[] = [
  {
    iconSrc: homeSrc,
    alt: "Home",
    location: { name: "/waiter/tables" },
  },
  {
    iconSrc: billSrc,
    alt: "Bill",
    location: { name: "/waiter/table/[tableId]/payment", params: { tableId: route.params.tableId } },
  },
  {
    iconSrc: shoppingCartSrc,
    alt: "Shopping Cart",
    location: { name: "/waiter/table/[tableId]/order", params: { tableId: route.params.tableId } },
  },
];
</script>

<template>
  <div class="min-h-screen grid grid-rows-[auto,1fr,auto]">
    <header class="flex items-center p-2 gap-x-2 bg-gradient-to-b from-primary via-primary to-transparent">
      <img :src="logoSrc" alt="logo" class="block rounded-full size-12" />
      <p>
        Supotso no Ochaya
      </p>
      <div class="grow" />
    </header>
    <main :class="props.class">
      <slot />
    </main>
    <footer class="border-t">
      <div v-if="showNavigationFooter" class="flex gap-2 justify-around items-baseline p-2">
        <template v-for="link of footerLinks" :key="link">
          <router-link :to="link.location" :title="link.alt" class="p-2">
            <img :src="link.iconSrc" :alt="link.alt" class="size-8" />
          </router-link>
        </template>
      </div>
    </footer>
  </div>
</template>
