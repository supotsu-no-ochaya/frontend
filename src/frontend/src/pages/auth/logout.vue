<script setup lang="ts">
import { authService } from "@/services/user/authService.ts";
import { useRouter } from "vue-router";

const router = useRouter();

await authService.logout();
await router.push("/");
</script>

<template>

</template>
