import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

export const useTableStore = defineStore('table', () => {
  const table = useLocalStorage('table', {
    persons: {}, // For counting people by ID
    timers: {} // To store additional properties or data
  });

  const addPerson = (id) => {
    if (id in table.value.persons) {
      table.value.persons[id] += 1; // Increment count for this ID
    } else {
      table.value.persons[id] = 1; // Initialize count for this ID
    }
  };

  const removePerson = (id) => {
    if (id in table.value.persons && table.value.persons[id] > 1) {
      table.value.persons[id] -= 1; // Decrement count
    } else if (id in table.value.persons) {
      delete table.value.persons[id]; // Remove the ID when count reaches zero
    }
  };



  return { table, addPerson, removePerson};
});
