import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

export const useTableStore = defineStore('table', () => {
  const table = useLocalStorage('table', {}); // Reactive localStorage-backed cart

  const addPerson = (id) => {
  	if (id in table.value){
		table.value[id] += 1
  	} else {
  		table.value[id] = 1
  	}
  }

  const removePerson = (id) => {
  	if (id in table.value && table.value[id] > 0){
  		table.value[id] -= 1
  	} else {
  		table.value[id] = 1
  	}
  }

  return { table, addPerson, removePerson};
});