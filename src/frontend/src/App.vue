<script setup lang="ts">
import {Toaster} from "@/components/ui/toast";
import { LucideLoaderCircle } from "lucide-vue-next";
</script>

<template>
  <router-view v-slot="{ Component }">
    <Suspense>
      <component :is="Component" :key="$route.fullPath" />
      <template #fallback>
        <div class="min-h-screen p-4 grid place-items-center">
          <LucideLoaderCircle class="size-10 animate-spin" />
        </div>
      </template>
    </Suspense>
  </router-view>
  <Toaster />
</template>
