<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <th :class="cn('[&:has([role=checkbox])]:pr-0', props.class)">
    <slot />
  </th>
</template>
