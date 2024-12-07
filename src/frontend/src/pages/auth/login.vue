<script setup lang="ts">
import { DefaultLayout } from "@/layouts/default";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ref } from "vue";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LucideCircleAlert } from "lucide-vue-next";
import { useRouter } from "vue-router";
import { Label } from "@/components/ui/label";

const router = useRouter();

const emailValue = ref("");
const passwordValue = ref("");
const loginFailed = ref(false);

function doLogin() {
  loginFailed.value = false;
  alert(`Doing Login with ${ emailValue.value } and ${ passwordValue.value }.`);
  router.push({ name: "/" });
}
</script>

<template>
  <DefaultLayout class="p-4 grid place-content-center">
    <form class="max-w-sm space-y-4" @submit.prevent="doLogin">
      <div class="space-y-0.5">
        <Label for="email">Email</Label>
        <Input v-model.trim="emailValue" id="email" type="email" required />
        <span class="text-muted-foreground text-sm">Geben Sie ihre Email-Adresse ein</span>
      </div>
      <div class="space-y-0.5">
        <Label for="password">Passwort</Label>
        <Input v-model.trim="passwordValue" id="password" type="password" required />
        <span class="text-muted-foreground text-sm">Geben Sie ihr Password ein</span>
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
      <Button type="submit" class="w-full">Einloggen</Button>
    </form>
  </DefaultLayout>
</template>
