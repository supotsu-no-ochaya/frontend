<script setup lang="ts">
import { DefaultLayout } from "@/layouts/default";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ref } from "vue";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LucideCircleAlert } from "lucide-vue-next";

const emailValue = ref("");
const passwordValue = ref("");
const loginFailed = ref(false);

function doLogin() {
  loginFailed.value = false;
  alert(`Doing Login with ${ emailValue.value } and ${ passwordValue.value }.`);
}
</script>

<template>
  <DefaultLayout class="p-4 grid place-content-center">
    <form class="w-full max-w-lg flex flex-col gap-4" @submit.prevent="doLogin">
      <div class="flex flex-col gap-0.5">
        <label for="email">Email</label>
        <Input v-model.trim="emailValue" id="email" type="email" />
        <span class="text-muted-foreground">Geben Sie ihre Email-Adresse ein</span>
      </div>
      <div class="flex flex-col gap-0.5">
        <label for="password">Passwort</label>
        <Input v-model.trim="passwordValue" id="password" type="password" />
        <span class="text-muted-foreground">Geben Sie ihr Password ein</span>
      </div>
      <Alert v-if="loginFailed" variant="destructive">
        <LucideCircleAlert class="size-4" />
        <AlertTitle>
          Login fehlgeschlagen
        </AlertTitle>
        <AlertDescription>
          Die Email-Adresse oder das Passwort ist falsch
        </AlertDescription>
      </Alert>
      <Button type="submit">Einloggen</Button>
    </form>
  </DefaultLayout>
</template>
