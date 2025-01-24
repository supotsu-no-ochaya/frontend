<script setup lang="ts">
import { authService } from "@/services/user/authService.ts";
import { useRouter } from "vue-router";

const router = useRouter();

const roleIds = {
  kitchen: "0nv0hftq0zu38m6",
  waiter: "7p0190henr3658i",
  admin: "f9161921yq36029",
}

const user = authService.getCurrentUser();
if (user === null) {
  await router.push("/auth/login");
} else {
  // const role = await userRoleService.getById(user.role);
  // role.user_name ===
  if (user.role === roleIds.admin) {
      await router.push("/admin");
  } else if (user.role === roleIds.waiter) {
    await router.push("/waiter");
  } else if (user.role === roleIds.kitchen) {
    await router.push("/kitchen");
  } else {
    throw new Error(`Unknown user role: '${user.role}'`);
  }
}
</script>

<template>

</template>
