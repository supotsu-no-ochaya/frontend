<script setup lang="ts">
import { authService } from "@/services/user/authService.ts";
import { useRouter } from "vue-router";
import { userRoleService } from "@/services/user/userRoleService.ts";

const router = useRouter();

const user = authService.getCurrentUser();
if (user === null) {
  await router.push("/auth/login");
} else {
  const role = await userRoleService.getById(user.role);
  if (role.role_name === "Kuechenchef") {
      await router.push("/admin");
  } else if (role.role_name === "Kellner") {
    await router.push("/waiter");
  } else if (role.role_name === "Kueche") {
    await router.push("/kitchen");
  } else {
    throw new Error(`Unknown user role: '${role.role_name}'`);
  }
}
</script>

<template>

</template>
