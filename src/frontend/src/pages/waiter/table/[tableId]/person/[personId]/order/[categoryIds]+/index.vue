<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed, onMounted } from "vue";
import { DefaultLayout } from "@/layouts/default";
import { Button } from "@/components/ui/button";
import WaiterControlHeader from "@/components/waiter/WaiterControlHeader.vue";
import { computedAsync } from "@vueuse/core";
import { menuCategService } from "@/services/menu/menuCategService.ts";
import { menuItemService } from "@/services/menu/menuItemService.ts";
import { LucideMinus, LucidePlus } from "lucide-vue-next";

import { useCartStore, lockedStore } from "@/components/cart.js";
import { getIconURL } from "@/services/Icons/getIcons";
import Swal from 'sweetalert2';

const route = useRoute("/waiter/table/[tableId]/person/[personId]/order/[categoryIds]+/");
const tableId = computed(() => route.params.tableId);
const personId = computed(() => route.params.personId);
const categoryIds = computed(() => route.params.categoryIds);
const tableIdVal = tableId.value
const personIdVal = personId.value

const category = computedAsync(async () => {
  return await menuCategService.getById(categoryIds.value[categoryIds.value.length - 1]);
});

const subCategories = computedAsync(async () => {
  if (!category.value) return null;
  return await menuCategService.getByParentCategoryID(category.value.id);
});

const menuItems = computedAsync(async () => {
  if (!category.value) return null;
  return await menuItemService.getAllMenuItemsWithCategoryID(category.value.id);
});

const cartStore = useCartStore();

const addToCart = (product,table, person) => {
  cartStore.addToCart(product, table, person);
};

const subFromCart = (product,table, person) => {
  cartStore.subFromCart(product, table, person);
};

const clearCart = () => {
  cartStore.clearCart();
}

onMounted(() => {
  if ((lockedStore.noCart.filter(item=> item.table == tableId.value && item.person == personId.value).map(item => item.locked))[0]==true){
    console.log("locked") //ToDo as popup "pay first"
    showMessage()
    router.push("/waiter/tables")
    // router.push("/waiter/table/:tableIdVal") //TODO table ID übernehmen
  }
})

function showMessage() {
  Swal.fire({
    // title: 'Hallo!',
    text: `Person ${personIdVal} von Tisch ${tableIdVal} muss zuerst bezahlen.`,
    // icon: 'info',
    width: '80vw',
    position: 'bottom',
    timer: 2100, // Popup schließt sich automatisch nach 2 Sekunden
    showConfirmButton: false,
  });
}
</script>

<template>
  <DefaultLayout footer="waiter-nav" v-if="category">
    <WaiterControlHeader :label="category.name" icon="cutlery" />
    <div class="flex flex-col flex-1 gap-2 p-2">
      <div class="flex justify-end items-center">
        <div class="w-20 h-20 bg-primary rounded-full"> <!--vertikal zentrieren-->
          <div class="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
            <div class="text-l text-center">
              <p>Tisch: {{ tableId }}</p>
              <p>Person {{ personId }}</p>
            </div>
          </div>
        </div>
      </div>
      <template v-if="subCategories !== null" v-for="subCategory in subCategories">
        <router-link class="group" :to="{ name: '/waiter/table/[tableId]/person/[personId]/order/[categoryIds]+/', params: { tableId, personId, categoryIds: [...categoryIds, subCategory.id] } }">
          <Button class="w-full flex gap-2 group-even:flex-row-reverse" >
           <img class="h-full" :src="getIconURL(subCategory)" :alt="subCategory.name" />
            <div class="grow" />
            <div class="text-2xl">
              {{ subCategory.name }}
            </div>
          </Button>
        </router-link>
      </template>
    </div>
    <div class="grid grid-cols-2 p-2 gap-2">
      <template v-for="menuItem in menuItems" >
        <div v-if="!menuItem.disabled" class="bg-primary rounded-xl mt-5 flex-col flex">
         <img class="mx-auto px-6 py-2 w-3/5 bg-background rounded-xl -mt-5" :src="getIconURL(menuItem)" :alt="menuItem.name" />
          <div class="flex justify-evenly px-1 py-2">
            <Button size="icon" class="bg-background" @click="subFromCart(menuItem,tableId, personId)">
              <LucideMinus />
            </Button>
            <div class="bg-background rounded-xl min-w-8 grid place-content-center">
              {{ cartStore.cart.find(item => item.id === menuItem.id && item.table === tableId && item.person === personId) ?
              cartStore.cart.find(item => item.id === menuItem.id && item.table === tableId && item.person === personId).quantity
              : 0 }}
            </div>
            <Button size="icon" class="bg-background" @click="addToCart(menuItem,tableId, personId)">
              <LucidePlus />
            </Button>
          </div>
          <div class="text-xl grow px-1">
            {{ menuItem.name }}
          </div>
          <div class="text-sm px-1">
            {{ (menuItem.price/100).toFixed(2) }}€
          </div>
        </div>
      </template>
    </div>
  </DefaultLayout>
</template>
