import { computedAsync } from "@vueuse/core";
import { reactive, watch } from "vue";
import { authService } from "@/services/user/authService";
import { menuCategService } from "@/services/menu/menuCategService";
import { watchEffect } from "vue";
import { orderItemService, OrderItemService } from "@/services/order/orderItemService";
import { orderService } from "@/services/order/orderService";
import { menuItemService } from "@/services/menu/menuItemService";
import { userService } from "@/services/user/userService";


authService.login("kitchen", "testtest");

// const allStationnames_raw = computedAsync(() => menuCategService.getAllMainCategories());
const allStationnames_raw = computedAsync(() => menuCategService.getStationsCategories());
const OrderItems_raw = computedAsync(() => orderItemService.getAll());
const Orders_raw = computedAsync(() => orderService.getAll());
const menu_items_raw = computedAsync(()=> menuItemService.getAll());
const users_raw =computedAsync(() => userService.getAll());
console.log("users:", users_raw.value)
console.log("stations:", allStationnames_raw.value)
// for (let station of allStationnames_raw._value){
//   console.log(station)
// }
//  const allStationnames


export interface OrderItem {
  name: string;           // Name of the item ordered
  notes: string;          // Additional notes specific to this item
  clicked: boolean;       // Indicates if the item has been processed
}

// Interface representing an individual order
export interface Order {
  id: string;             // Unique identifier for the order
  table: string;          // Table number where the order was placed
  waiter: string;         // Name of the waiter serving this order
  time: string;           // Time when the order was taken
  state: boolean;         // State of the order (eg, completed or not)
  allclicked: boolean;    // Indicates if all items in the order are clicked/processed
  orderlist: OrderItem[]; // List of items in the order
}

type FoodStationName = string;

// Interface representing the entire collection of all orders for all stations
export interface AllOrders {
  [stationName: FoodStationName]: Order[]; // Station name maps to an array of orders
}

export const allStationnames = reactive<FoodStationName[]>([]);

watch(allStationnames_raw, (newStationnames)=>{
  if (allStationnames_raw.value) {
    // Zugriff auf die Daten, sobald sie geladen sind
    for (let station of allStationnames_raw.value){
      allStationnames.push(station.name)
      console.log("stationpushed:", station.name)
    }
  }
});

watchEffect(() => {
  // console.log("menuitem", menuItemService.getAllMenuItemsWithCategoryID("m6l80c3w6te7611"))
  if (allStationnames_raw.value && Orders_raw.value) {
    // Zugriff auf die Daten, sobald sie geladen sind
    // for (let station of allStationnames_raw.value){
    //   allStationnames.push(station.name)
    //   console.log("station:", station.name)
    // }
    for (let Order of Orders_raw.value){
      const newOrder = {
              id: String(Order.id),
              table: String(Order.table),
              waiter: String(Order.waiter),
              time: Order.created,
              // time: Order.updated,
              state: false,
              orderlist: OrderItems_raw.value?.map(Item =>({
                // name: menuItemService.getAllMenuItemsWithCategoryID(Item.menu_item),
                notes: Item.notes
              })),
              allclicked: false,
        }
      console.log(newOrder)
    }
  }
});
console.log(allStationnames)

export const allOrders = reactive<AllOrders>({
  Crepes: [
    {
      id: '0',
      table: '2',
      waiter: 'Lea',
      time: '12:45 Uhr',
      state: false,
      allclicked: false,
      orderlist: [
        { name: 'nutella das von vorneherein viele Special Zutaten hat', notes: 'Extra Sahne' , clicked: false },
        { name: 'Banane', notes: '' , clicked: false },
        { name: 'Käseschinken', notes: 'Ohne Käse' , clicked: false }
      ],
    },
    {
      id: '1',
      table: '3',
      waiter: 'Sylvie',
      time: '12:50 Uhr',
      state: false,
      allclicked: false,
      orderlist: [
        { name: 'Zucker & Zimt', notes: '' , clicked: false },
        { name: 'nutella', notes: 'Zusätzlicher Löffel Nutella und gaaaanz viele andere Extrawünsche. Zusätzlicher Löffel Nutella und gaaaanz viele andere Extrawünsche' , clicked: false },
        { name: 'Erdbeer', notes: '' , clicked: false },
        { name: 'Zucker', notes: '' , clicked: false }
      ],
    },
    {
      id: '2',
      table: '9',
      waiter: 'Sylvie',
      time: '12:56 Uhr',
      state: false,
      allclicked: false,
      orderlist: [
        { name: 'Zucker & Zimt', notes: '' , clicked: false },
        { name: 'Banane', notes: '' , clicked: false },
        { name: 'Käseschinken', notes: 'Ohne Butter' , clicked: false },
        { name: 'Zucker', notes: '' , clicked: false }
      ],
    },
    {
      id: '3',
      table: '1',
      waiter: 'Sabine',
      time: '12:59 Uhr',
      state: false,
      allclicked: false,
      orderlist: [
        { name: 'Erdbeer', notes: '' , clicked: false },
        { name: 'Zucker & Zimt', notes: 'Leicht bestreut', clicked: false  },
        { name: 'Banane', notes: '' , clicked: false },
        { name: 'Zucker', notes: '', clicked: false  }
      ],
    },
    {
      id: '4',
      table: '3',
      waiter: 'Sylvie',
      time: '13:04 Uhr',
      state: false,
      allclicked: false,
      orderlist: [
        { name: 'Apfel', notes: '' , clicked: false },
        { name: 'Käseschinken', notes: '' , clicked: false },
        { name: 'Schokolade', notes: '', clicked: false  }
      ],
    }
  ],
  Sandwiches: [
    {
      id: '0',
      table: '4',
      waiter: 'Martin',
      time: '17:89 Uhr',
      state: false,
      allclicked: false,
      orderlist: [
        { name: 'Käse', notes: '' , clicked: false }
      ],
    },
    {
      id: '1',
      table: '6',
      waiter: 'Robin',
      time: '14 Uhr',
      state: false,
      allclicked: false,
      orderlist: [
        { name: 'Käse', notes: '' , clicked: false }
      ],
    }
  ],
});

// adds all unassigned stationnames to allOrders as empty list
watch(allStationnames, (newStationnames) => {
  newStationnames.forEach(stationName => {
    if (!allOrders[stationName]) {
      allOrders[stationName] = [];
    }
  });
}, { deep: true, immediate: true });

function addStation(Stationname: string){
  if (!allOrders[Stationname]) {
    allOrders[Stationname] = []
    console.log("added Station")
    }
}

// export function addOrder(category: string, orderId: String, orderTable: String, orderWaiter: String, orderlist: any[], orderNotes: any[]) {
//   const newOrder = {
//       id: String(orderId),
//       table: String(orderTable),
//       waiter: orderWaiter,
//       time: new Date().toLocaleTimeString('de-DE', { hour: "2-digit", minute: "2-digit" }) + ' Uhr', // Zeit wird automatisch hinzugefügt
//       state: false,
//       orderlist: orderlist,
//       allclicked: false,
//       clicked: orderlist.map(() => false), // Für jeden Eintrag in orderlist wird false hinzugefügt
//       notes: orderNotes // Bemerkungen zur Bestellung
//   };

//   // Überprüfen, ob die Kategorie existiert
//   if (!allOrders[category]) {
//       console.error(`Kategorie "${category}" existiert nicht.`);
//       return;
//   }

//   // Bestellung zur Kategorie hinzufügen
//   allOrders[category].push(newOrder);

//   console.log(`Neue Bestellung in Kategorie "${category}" hinzugefügt:`, newOrder);
// }
