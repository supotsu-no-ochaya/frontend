<script setup lang="ts">
import { DefaultLayout } from "@/layouts/default";
import { Button } from "@/components/ui/button";
</script>

<template>
  <DefaultLayout class="grid place-content-center text-center gap-2">
    <h1 class="text-4xl font-bold">
      Die Seite wurde nicht gefunden
    </h1>
    <p>
      Die angeforderte URL wurde nicht gefunden.
      Wenn Sie die URL manuell eingegeben haben, überprüfen Sie bitte Ihre Schreibweise und versuchen Sie es erneut.
    </p>
    <router-link :to="{ name: 'home' }" class="w-fit mx-auto">
      <Button variant="link" size="lg" class="text-2xl">
        Startseite
      </Button>
    </router-link>
  </DefaultLayout>
</template>
