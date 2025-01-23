import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

export const useCartStore = defineStore('cart', () => {
  const cart = useLocalStorage('cart', []); // Reactive localStorage-backed cart

  const addToCart = (product,table, person) => {
    const existing = cart.value.find(item => item.id === product.id && item.table === table && item.person === person);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.value.push({ ...product, quantity: 1, table, person });
    }
  };

  const subFromCart = (product,table, person) => {
    const existing = cart.value.find(item => item.id === product.id && item.table === table && item.person === person);
    console.log("exiisting: " + existing)
    if (existing) {
      console.log("Item: ",cart.value.find(item => item.id === product.id),cart.value.find(item => item.id === product.id).quantity)
      if (cart.value.find(item => item.id === product.id).quantity > 0){
        console.log("*")
        existing.quantity -= 1;
      }
    } else {
      cart.value.push({ ...product, quantity: -1, table, person });
    }
  };

  const removeFromCart = (product,table, person) => {
    cart.value = cart.value.filter(item => !(item.id === product.id && item.table === table && item.person === person));
  };

  const clearCart = () => {
    cart.value = [];
  };

  return { cart, addToCart, removeFromCart, clearCart, subFromCart };
});