<script setup lang="ts">
import { ref } from 'vue';
import { DefaultLayout } from "@/layouts/default";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';

// Mock data with each item having its own 'checked' state
const mock_entrys = ref([
  { name: 'Person 1', total: 0, items: [{ name: 'Mochi_a', price: 3, checked: false }, { name: 'Mochi_b', price: 3, checked: false }, { name: 'Sandwich', price: 4, checked: false }] },
  { name: 'Person 2', total: 0, items: [{ name: 'Wasser', price: 1, checked: false }] },
  { name: 'Person 3', total: 0, items: [{ name: 'Mochi_a', price: 3, checked: false }, { name: 'Mochi_b', price: 3, checked: false }, { name: 'Sandwich', price: 4, checked: false }, { name: 'Saft_o', price: 2.5, checked: false }, { name: 'Saft_a', price: 2.5, checked: false }] },
]);

// Method to calculate total for a person based on checked items
const calculateTotal = (person) => {
  return person.items.reduce((total, item) => {
    return item.checked ? total + item.price : total;
  }, 0);
};

// Method to handle checkbox changes and update the total dynamically
const handleCheckboxChange = (checked: boolean, item: any, person: any) => {
  // Update the item's checked status
  item.checked = checked;

  // Recalculate the total for this person
  person.total = calculateTotal(person);
};

// Method to calculate the total sum for all people
const calculateTotalSum = () => {
  return mock_entrys.value.reduce((total, person) => total + person.total, 0);
};
</script>

<template>
  <DefaultLayout class="grid place-content-start text-2xl bg-secondary w-full">
    <div class="relative w-full">

      <!-- Fixed header with title -->
      <div class="flex items-center h-16 fixed top-[4rem] left-0 w-full z-10">
        <Button @click="() => { console.log('click'); }" class="w-12 h-12 text-center bg-accent p-2 m-2">
          <img src="/ArrowBack.png" class="w-full h-full" />
        </Button>
        <div class="flex-grow text-black text-center p-2">
          Bestellung
        </div>
        <img class="w-12 h-12 text-white text-center p-2 mx-2" src="/shopping-cart.png" alt="icon" />
      </div>

      <!-- Table section fixed just below the header -->
      <div class="flex items-center justify-center h-16 fixed top-[6rem] left-0 w-full z-10">
        Tisch 1
      </div>

      <!-- Divider with a fixed position -->
      <div class="flex w-full h-4 bg-primary my-4 fixed top-[9rem] left-0 z-10"></div>

      <!-- Scrollable container, adjusts to fit between the headers and the footer -->
      <div class="items-center fixed mt-[8rem] mb-[6rem] ml-8 overflow-y-auto max-h-[calc(100vh-16rem)] mx-auto w-4/5 max-w-3xl">
        <Accordion type="multiple" class="w-full mx-auto">
          <AccordionItem v-for="person in mock_entrys" :key="person.name" :value="person.name">
            <AccordionTrigger>{{ person.name }}</AccordionTrigger>
            <AccordionContent class="max-h-[80vh] overflow-y-auto">
              <Table>
                <TableBody>
                  <TableRow v-for="(item, index) in person.items" :key="index">
                    <TableCell>
                      <div>{{ item.name }}</div>
                    </TableCell>
                    <TableCell>
                      <div>{{ item.price }}€</div>
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        :checked="item.checked"
                        @update:checked="(checked) => handleCheckboxChange(checked, item, person)"
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div class="flex items-center justify-center font-bold">{{ person.name }}: {{ calculateTotal(person) }}€</div>
            </AccordionContent>
           
          </AccordionItem>
        </Accordion>
      </div>

      <!-- Fixed footer displaying total -->
      <div class="fixed bottom-0 left-0 w-full bg-primary text-lg font-bold text-center py-4">
        <strong>Total Sum: {{ calculateTotalSum() }}€</strong>
      </div>
    </div>
  </DefaultLayout>
</template>
