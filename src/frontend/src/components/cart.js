import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

export const useCartStore = defineStore('cart', () => {
  const cart = useLocalStorage('cart', []); // Reactive localStorage-backed cart

  const addToCart = (product,table, person) => {
    const existing = cart.value.find(item => item.id === product.id && item.table === table && item.person === person);
    if (existing) {
      existing.quantity += 1;
      existing.notes.push("")
      existing.isOpen.push(false)
    } else {
      cart.value.push({ ...product, quantity: 1, table, person, notes: [""], isOpen: [], isSend: false, orderId: [] });
    }
  };

  const subFromCart = (product,table, person) => {
    const existing = cart.value.find(item => item.id === product.id && item.table === table && item.person === person);
    if (existing) {
      if (cart.value.find(item => item.id === product.id).quantity > 0){
        existing.quantity -= 1;
        console.log(existing.notes)
        existing.notes.pop()
        console.log(existing.notes)
        existing.isOpen.push(false)
      }
    } else {
      cart.value.push({ ...product, quantity: 0, table, person, notes: [], isOpen: [], isSend: false, orderId: [] });
    }
  };

  const removeFromCart = (product,table, person) => {
    console.log("Remove from cart: ", cart.value.filter(item => (item.id === product.id && item.table === table && item.person === person)));
    cart.value = cart.value.filter(item => !(item.id === product.id && item.table === table && item.person === person));
    console.log(cart.value)
  };

  const clearCart = () => {
    cart.value = [];
  };

  return { cart, addToCart, removeFromCart, clearCart, subFromCart };
});
