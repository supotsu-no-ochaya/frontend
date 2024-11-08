<script setup lang="ts">
  import {useQuery} from "@tanstack/vue-query";
  import axios from "axios";

  const { isSuccess, status, data } = useQuery({
    queryKey: ['data'],
    queryFn: ({ signal }) => axios
      .get("/dish", { signal })
      .then(response => response.data),
    refetchInterval: 1_000,
    
  });
</script>

<template>
  <main class="min-h-screen grid place-content-center text-2xl">
    <img class="size-20 mx-auto" src="/icon.svg" alt="icon" />
    <div>Hello World</div>
    
    <div id="dish">
      <h1 style="padding-bottom: 1cm;">Dish Example</h1>

      <div id="dish.dish">Dish: {{ data.dish }}</div>
      <div id="dish.price">Price: {{ data.price }}</div>
      <div id="dish.tags">Tags: {{ data.tags }}</div>
      <div id="dish.stock">Stock: {{ data.stock }}</div>
      <div id="dish.timestamp">TimeStamp {{ data.timestamp }}</div>
    </div>
    <div>Error: {{ error }}</div>
    
  </main>
</template>
