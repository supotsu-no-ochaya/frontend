<script setup lang="ts">
import { authService } from "@/services/user/authService.ts";
import { useRouter } from "vue-router";
import { ROLE_IDS } from "@/constants.ts";

const router = useRouter();

const user = authService.getCurrentUser();
if (user === null) {
  await router.push("/auth/login");
} else {
  // const role = await userRoleService.getById(user.role);
  // role.user_name ===
  if (user.role === ROLE_IDS.admin) {
      await router.push("/admin");
  } else if (user.role === ROLE_IDS.waiter) {
    await router.push("/waiter");
  } else if (user.role === ROLE_IDS.kitchen) {
    await router.push("/kitchen");
  } else {
    throw new Error(`Unknown user role: '${user.role}'`);
  }
}
</script>

<template>

</template>
