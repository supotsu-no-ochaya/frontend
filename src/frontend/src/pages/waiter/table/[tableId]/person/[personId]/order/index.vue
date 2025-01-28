<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, reactive, ref } from "vue";
import { DefaultLayout } from "@/layouts/default";
import { Button } from "@/components/ui/button";
import WaiterControlHeader from "@/components/waiter/WaiterControlHeader.vue";
import { menuCategService } from "@/services/menu/menuCategService.ts";
import { computedAsync } from "@vueuse/core";
import { getIconURL } from "@/services/Icons/getIcons";
import Swal from 'sweetalert2';

import { lockedStore } from "@/components/cart.js";

const router = useRouter();
const route = useRoute("/waiter/table/[tableId]/person/[personId]/order/");
const tableId = computed(() => route.params.tableId);
const personId = computed(() => route.params.personId);
const tableIdVal = tableId.value
const personIdVal = personId.value

const mainCategories = computedAsync(() => menuCategService.getAllMainCategories());

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
  <DefaultLayout footer="waiter-nav">
    <WaiterControlHeader label="Essen Kategorien" icon="cutlery" />
    <div class="flex flex-col flex-1 gap-2 p-2">
      <div class="flex justify-end items-center">
        <div class="w-20 h-20 bg-primary rounded-full"> <!--vertikal zentrieren-->
          <div class="text-l mb-4 text-center flex justify-center">Tisch: {{ tableId }} Person {{ personId }}</div>
        </div> 
      </div>
      <template v-for="mainCategory in mainCategories">
        <router-link class="group" :to="{ name: '/waiter/table/[tableId]/person/[personId]/order/[categoryIds]+/', params: { tableId, personId, categoryIds: [mainCategory.id] } }">
          <Button class="w-full flex gap-2 group-even:flex-row-reverse">
           <img class="h-full" :src="getIconURL(mainCategory)" :alt="mainCategory.name" />
            <div class="grow" />
            <div class="text-2xl">
              {{ mainCategory.name }}

              
            </div>
          </Button>
        </router-link>
      </template>
    </div>
  </DefaultLayout>
</template>
