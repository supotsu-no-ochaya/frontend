import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { reactive } from 'vue';

export const lockedCart = defineStore('noCart', () => {
  const noCart = useLocalStorage('noCart', []);

  const lockPerson = (table, person) =>{
    console.log("init", person, table);

    const existing = noCart.value.find(item => item.person === person && item.table === table);
    if (existing) {
      console.log("xxxxxxxxxxx", noCart); //TODO delete later
      existing.locked = true
    } else {
      console.log("init:", person, table);
      console.log("added smth", noCart.value);
      noCart.value.push({person: person , table: table, locked: true});
    }
  };

  const openPerson = (table, person) =>{
    let index = noCart.value.findIndex(item => item.person === person && item.table === table);
    if (index !== -1) {
      noCart.value.splice(index, 1);
      console.log("opened cause payed: Person",person, "tisch", table )
    }
  };

  const clearCart = () => {
    noCart.value = [];
  };

  return {noCart, lockPerson, openPerson, clearCart}
});

export const lockedStore = reactive(lockedCart())


export const useCartStore = defineStore('cart', () => {
  const cart = useLocalStorage('cart', []); // Reactive localStorage-backed cart

  const addToCart = (product,table, person) => {
    const existing = cart.value.find(item => item.id === product.id && item.table === table && item.person === person);
    if (existing) {
      existing.quantity += 1;
      existing.notes.push("")
      existing.isOpen.push(false)
      existing.isChecked.push(false)
    } else {
      cart.value.push({ ...product, quantity: 1, table, person, notes: [""], isOpen: [], isChecked: [], isSend: false, orderId: [] });
    }
  };

  const subFromCart = (product,table, person) => {
    const existing = cart.value.find(item => item.id === product.id && item.table === table && item.person === person);
    if (existing) {
      if (cart.value.find(item => item.id === product.id).quantity > 0){
        existing.quantity -= 1;
        console.log(existing.notes) //TODO delete
        existing.notes.pop()
        console.log(existing.notes)
        existing.isOpen.push(false)
      }
    } else {
      cart.value.push({ ...product, quantity: 0, table, person, notes: [], isOpen: [], isSend: false, orderId: [] });
    }
  };

  const removeFromCart = (product,table, person) => {
    console.log("Remove from cart: ", cart.value.filter(item => (item.id === product.id && item.table === table && item.person === person))); //TODO delete
    cart.value = cart.value.filter(item => !(item.id === product.id && item.table === table && item.person === person));
    console.log(cart.value)
  };

  const clearCart = () => {
    cart.value = [];
  };

  return { cart, addToCart, removeFromCart, clearCart, subFromCart };
});
