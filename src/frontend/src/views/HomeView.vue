<script setup lang="ts">
  import {useQuery} from "@tanstack/vue-query";
  import axios from "axios";
  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table'
  import { Badge } from '@/components/ui/badge'


  const { isSuccess, error, data } = useQuery({
    queryKey: ['data'],
    queryFn: ({ signal }) => axios
      .get("/dish", { signal })
      .then(response => response.data)
      ,
    refetchInterval: 1_000, 
    });
</script>

<template>
  <main class="min-h-screen grid place-content-center text-2xl">
    <img class="size-20 mx-auto" src="/icon.svg" alt="icon" />
    <div id="dish.table">
      <Table>
        <TableCaption>Übersich der Gerichte von Supotsu no Ochaya
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead v-for="(value, key) in data[0]" :key="key">{{key}}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="dataset in data">
            <TableCell v-for="(value, key) in dataset" :key="value">
              <div v-if="key=='tags'"><badge v-for="item in value">{{ item }}</badge></div>
              <div v-else>{{ value }}</div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </main>
</template>
