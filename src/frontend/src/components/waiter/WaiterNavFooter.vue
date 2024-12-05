<script setup lang="ts">
import { type RouteLocationRaw, useRoute } from "vue-router";
import homeSrc from "@/assets/icons/navigation/home.svg";
import billSrc from "@/assets/icons/navigation/bill.svg";
import shoppingCartSrc from "@/assets/icons/navigation/shopping-cart.svg";

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
  <template v-for="link of footerLinks" :key="link">
    <router-link :to="link.location" :title="link.alt" class="p-2">
      <img :src="link.iconSrc" :alt="link.alt" class="size-8" />
    </router-link>
  </template>
</template>
