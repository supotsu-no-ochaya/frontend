<script setup lang="ts">
import { reactive, ref } from 'vue';
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
import { Separator } from '@/components/ui/separator';

const Tisch = "Tisch 1"
const Rabatt = reactive({value:0.10,checked: false})

// Mock data with each item having its own 'checked' state
const mock_entrys = ref([
  { name: 'Person 1', total: 0, checked: false, items: [{ name: 'Mochi_a', price: 3, checked: false }, { name: 'Mochi_b', price: 3, checked: false }, { name: 'Sandwich', price: 4, checked: false }] },
  { name: 'Person 2', total: 0, checked: false, items: [{ name: 'Wasser', price: 1, checked: false }] },
  { name: 'Person 3', total: 0, checked: false, items: [{ name: 'Mochi_a', price: 3, checked: false }, { name: 'Mochi_b', price: 3, checked: false }, { name: 'Sandwich', price: 4, checked: false }, { name: 'Saft_o', price: 2.5, checked: false }, { name: 'Saft_a', price: 2.5, checked: false }] },
]);

// Method to calculate total for a person based on checked items
const calculateTotal = (person) => {
  return person.items.reduce((total, item) => {
    return item.checked ? total + item.price : total;
  }, 0);
};

// Method to handle checkbox changes and update the total dynamically
const handleItemCheckboxChange = (checked: boolean, item: any, person: any) => {
  console.log(checked)
  // Update the item's checked status
  item.checked = checked;

  // Recalculate the total for this person
  person.total = calculateTotal(person);
};

const handlePersonCheckboxClick = (checked: boolean, person: any) => {
      person.checked = checked
      person.items.forEach(element => {element.checked = checked});
      person.total = calculateTotal(person);
    };

const handleRabattCheckboxClick = (checked: boolean) => {
  Rabatt.checked = checked
}

// Method to calculate the total sum for all people
const calculateTotalSum = () => {
  let total = mock_entrys.value.reduce((total, person) => total + person.total, 0)
  if (Rabatt.checked) {
    total = total*(1-Rabatt.value)
  }
  return total;
};
</script>

<template>
  <DefaultLayout show-navigation-footer class="grid place-content-start text-2xl bg-secondary w-full">
    <div class="fixed w-full">

      <!-- Header Section -->
      <div class="flex items-center h-16 relative w-full z-10">
        <Button variant="ghost" @click="() => { console.log('click'); }" class="w-12 h-12 text-center bg-accent p-2 m-2">
          <img src="/ArrowBack.png" class="w-full h-full" />
        </Button>
        <div class="flex-grow text-black text-center p-2">
          Bestellung<br>
          {{ Tisch }}
        </div>
        <img class="w-12 h-12 text-white text-center p-2 mx-2" src="/shopping-cart.png" alt="icon" />
      </div>

      <!-- Divider -->
      <div class="flex w-full h-4 my-4 z-10">
        <Separator class="h-1/3 bg-primary rounded text-xl font-bold"></Separator>
      </div>

      <!-- Scrollable Content Section -->
      <div class="relative mt-4 px-8 overflow-y-auto max-h-[calc(100vh-22rem)] w-full">
        <Accordion type="multiple" class="w-4/5 mx-auto">
          <AccordionItem v-for="person in mock_entrys" :key="person.name" :value="person.name">
            <AccordionTrigger>
              {{ person.name }} 
              <Checkbox
                :checked="person.checked"
                @update:checked="(checked) => handlePersonCheckboxClick(checked, person)"
                @click.stop
              />     
            </AccordionTrigger>
            <AccordionContent class="max-h-[80vh] overflow-y-auto">
              <Table>
                <TableBody>
                  <TableRow v-for="(item, index) in person.items" :key="index">
                    <TableCell class="w-2/5">
                      <div>{{ item.name }}</div>
                    </TableCell>
                    <TableCell class="w-2/5">
                      <div>{{ item.price.toFixed(2) }}€</div>
                    </TableCell>
                    <TableCell class="w-1/5 ">
                      <Checkbox
                        :checked="item.checked"
                        @update:checked="(checked) => handleItemCheckboxChange(checked, item, person)"
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div class="flex items-center justify-center font-bold">{{ person.name }}: {{ calculateTotal(person).toFixed(2) }}€</div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <!-- Rabatt Section -->
      <div class="flex fixed bottom-33 left-16 w-full px-8">
        <div class="flex items-center">
          <Checkbox
            class="border-black border w-4 h-4 mr-2"
            :checked="Rabatt.checked"
            @update:checked="(checked) => handleRabattCheckboxClick(checked)"
          />
          <div>Rabatt von {{ Rabatt.value * 100 }}%</div>
        </div>
      </div>

      <!-- Footer Section -->
      <div class="flex items-center fixed bottom-16 left-0 w-full bg-primary text-lg font-bold text-center py-4">
        <Button class="w-1/5 ml-2 bg-secondary active:bg-primary text-black" 
        @click="console.log('Bezahlen')">
        
          Bezahlen
        </Button>
        <strong class="w-3/5">Total Sum: {{ calculateTotalSum().toFixed(2) }}€</strong>
        <Button class="w-1/5 mr-2 bg-secondary active:bg-primary text-black" @click="console.log('Anpassen')">
          Anpassen
        </Button>
      </div>

    </div>
  </DefaultLayout>
</template>




<!--TODO:
Discount per person


-->