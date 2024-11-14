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
      .get("/api/test", { signal })
      .then(response => response.data)
      .then(console.log(data._value))
      ,
    refetchInterval: 1_000, 
    });
</script>

<template>
  <main class="min-h-screen grid place-content-center text-2xl">
    <img class="size-20 mx-auto" src="/icon.svg" alt="icon" />
    <div id="debug" style="visibility: hidden;">
      {{ data[0]}}<br>
      {{ Object.keys(data[0]) }}
    </div>
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
              <div v-if="key==='emailVisibility'"><Badge>{{value}}</Badge></div>
              <div v-else-if="key==='verified'"><Badge>{{value}}</Badge></div>
              <div v-else-if="key==='collectionName'"><Badge>{{value}}</Badge></div>
              <div v-else>{{ value }}</div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </main>
</template>

