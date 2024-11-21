<script setup lang="ts">
import {DefaultLayout} from "@/layouts/default";
import {Button} from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';

import { 
  Accordion,
    AccordionItem, 
    AccordionTrigger, 
    AccordionContent 
} from '@/components/ui/accordion';

import { Checkbox } from '@/components/ui/checkbox';

const mock_entrys = [
  {name: 'person1', total: 10, items:[{Mochi_a:3},{Mochi_b:3},{Sandwich:4}]},
  {name: 'person2', total: 1, items:[{Wasser:1}]},
  {name: 'person3', total: 15, items:[{Mochi_a:3},{Mochi_b:3},{Sandwich:4},{Saft_o:2.5},{Saft_a:2.5}]},
]
</script>

<template>
  <DefaultLayout class="grid place-content-start text-2xl bg-secondary w-full">
    <div class="fixed w-full">
      <div class="flex items-center h-16 fixed top-[4rem] left-0 w-full">
        <Button @click="()=>{console.log('click')}" class="w-12 h-12 text-center bg-accent p-2 m-2">
          <img src="/ArrowBack.png" class="w-full h-full">
        </Button>
        <div class="flex-grow text-black text-center p-2">
          Bestellung
        </div>
        <img class="w-12 h-12 text-white text-center p-2 mx-2" src="/shopping-cart.png" alt="icon" />
      </div>

      <div class="flex items-center justify-center h-16 fixed top-[6rem] left-0 w-full">
        Tisch 1
      </div>

      <div class="flex w-full h-4 bg-primary my-4 fixed top-[9rem] left-0"></div>

      <div class="relative flex items-center justify-center w-full top-[10rem]">
        <Accordion type="multiple" class="w-4/5 max-w-lg">
          <AccordionItem v-for="person in mock_entrys" :key="person.name" :value="person.name">
            <AccordionTrigger>{{ person.name }}</AccordionTrigger>
            <AccordionContent>
              <Table>
                <TableBody>
                  <TableRow v-for="item in Object.entries(person.items)">

                    <TableCell>
                      <div>{{ Object.keys(item[1])[0] }}</div>
                    </TableCell>
                    <TableCell>
                      <div>{{ Object.values(item[1])[0] }}€</div>
                    </TableCell>
                    <TableCell>
                      <Checkbox></Checkbox>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  </DefaultLayout>
</template>
