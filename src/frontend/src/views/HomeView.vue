<script setup lang="ts">
import {DefaultLayout} from "@/layouts/default";
import {Button} from "@/components/ui/button";
import {useToast} from "@/components/ui/toast";

const { toast } = useToast();
</script>

<template>
  <DefaultLayout class="grid place-content-center text-2xl">
    <img class="size-20 mx-auto" src="/icon.svg" alt="icon" />
    <div>Hello World</div>
    <Button @click="() => {
      toast({
        title: 'Hello World',
        description: 'This is a Toast Notification',
      });
    }">
      Show Toast
    </Button>
  </DefaultLayout>
</template>
