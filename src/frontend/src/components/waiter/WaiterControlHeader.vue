<script setup lang="ts">
import { LucideArrowLeft, LucideCupSoda, LucideShoppingCart, LucideUtensils } from "lucide-vue-next";
import { Button } from "@/components/ui/button";

const ICONS = {
  "cutlery": LucideUtensils,
  "drink": LucideCupSoda,
  "shopping-cart": LucideShoppingCart,
}

defineProps<{
  label: string
  icon: keyof typeof ICONS
}>();
</script>

<template>
  <div>
    <div class="flex gap-1 justify-around p-2">
      <Button variant="ghost" size="icon" @click="$router.back()">
        <LucideArrowLeft class="size-8" />
      </Button>
      <div class="grow text-center text-2xl font-bold truncate">
        {{ label }}
      </div>
      <Button variant="ghost" size="icon">
        <component :is="ICONS[icon]" class="size-8" />
      </Button>
    </div>
  </div>
</template>
