<script setup lang="ts">
import { onErrorCaptured, ref, watch } from "vue";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LucideCircleX } from "lucide-vue-next";
import { useRoute } from "vue-router";
import App from "@/App.vue";

const error = ref<Error | null>(null);

onErrorCaptured((e: Error) => {
  console.log({e});
  error.value = e;
  return false;
});

const route = useRoute();
watch(() => route.path, () => {
  error.value = null;
})
</script>

<template>
  <div v-if="error" class="min-h-screen grid place-content-center">
    <Alert variant="destructive">
      <LucideCircleX class="size-4" />
      <AlertTitle>
        Something unexpected went wrong.
      </AlertTitle>
      <AlertDescription class="font-mono">
        {{ error.name }}: {{ error.message }}
      </AlertDescription>
    </Alert>
  </div>
  <App v-else />
</template>
