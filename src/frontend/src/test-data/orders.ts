import { computedAsync } from "@vueuse/core";
import { reactive, toRefs, watch } from "vue";
import { authService } from "@/services/user/authService";
import { menuCategService } from "@/services/menu/menuCategService";
import { orderItemService } from "@/services/order/orderItemService";
import { orderService } from "@/services/order/orderService";
import { menuItemService } from "@/services/menu/menuItemService";
import { userService } from "@/services/user/userService";
import { debounce } from "lodash";

authService.login("kitchen", "testtest");

// const allStationnames_raw = computedAsync(() => menuCategService.getAllMainCategories());

const environment = reactive({
  allStationnames_raw: computedAsync(() => menuCategService.getStationsCategories()),
  OrderItems_raw: computedAsync(() => orderItemService.getAll()),
  Orders_raw: computedAsync(() => orderService.getAll()),
  menu_items_raw: computedAsync(() => menuItemService.getAll()),
  users_raw: computedAsync(() => userService.getAll()),
});

let knownIds = new Set(); // Lokale Speicherung der bekannten IDs

async function fetchChanges(all_records: any) {
  // Finde neue oder geänderte Items
  const newOrChanged = all_records.filter((item: any) => !knownIds.has(item.id));
  // console.log(knownIds)
  // Aktualisiere die bekannten IDs
  newOrChanged.forEach((item: any) => knownIds.add(item.id));

  console.log("Neue oder geänderte Items:", newOrChanged);
  return newOrChanged;
}

async function addFetchedIDs(){
  console.log(".................knownIDS:", knownIds)
  let temp_1 = Promise.all(await fetchChanges(await environment.allStationnames_raw))
  let temp_2 = Promise.all(await fetchChanges(await environment.OrderItems_raw))
  let temp_3 = Promise.all(await fetchChanges(await environment.Orders_raw))
  let temp_4 = Promise.all(await fetchChanges(await environment.menu_items_raw))
  let temp_5 = Promise.all(await fetchChanges(await environment.users_raw))
  console.log(".................knownIDS:", knownIds)
}

setTimeout(() => {
  addFetchedIDs(); // Funktion nach 12 Sekunden aufrufen
  console.log("Initialisierung der IDs gestartet.");
}, 12_000);

setInterval(async () => {
  let temp_1 = await fetchChanges(await menuCategService.getStationsCategories())
  let temp_2 = await fetchChanges(await orderItemService.getAll())
  let temp_3 = await fetchChanges(await orderService.getAll())
  let temp_4 = await fetchChanges(await menuItemService.getAll())
  let temp_5 = await fetchChanges(await userService.getAll())
  console.log("'''''''''''''''", environment.Orders_raw)

  if (temp_1.length){environment.allStationnames_raw = temp_1}
  if (temp_2.length){environment.OrderItems_raw = temp_2}
  if (temp_3.length){environment.Orders_raw = temp_3}
  if (temp_4.length){environment.menu_items_raw = temp_4}
  if (temp_5.length){environment.users_raw = temp_5}

//  if (environment.allStationnames_raw) {
//     environment.allStationnames_raw.push(...temp_1); // Spread-Syntax verwenden
//   }
//   if (environment.OrderItems_raw) {
//     environment.OrderItems_raw.push(...temp_2);
//   }
//   if (environment.Orders_raw) {
//     environment.Orders_raw.push(...temp_3);
//   }
//   if (environment.menu_items_raw) {
//     environment.menu_items_raw.push(...temp_4);
//   }
//   if (environment.users_raw) {
//     environment.users_raw.push(...temp_5);
//   }
}, 20_000);

watch(()=>environment.allStationnames_raw, (newStationnames)=>{
  if (Array.isArray(environment.allStationnames_raw)) {
    // Zugriff auf die Daten, sobald sie geladen sind
    console.log("test222")
    for (let station of environment.allStationnames_raw){
      allStationnames.push(station.name)
      console.log("stationpushed:", station.name)
    }
  }
});
// const allStationnames_raw = computedAsync(() => menuCategService.getStationsCategories());
// const OrderItems_raw = computedAsync(() => orderItemService.getAll());
// const Orders_raw = computedAsync(() => orderService.getAll());
// const menu_items_raw = computedAsync(()=> menuItemService.getAll());
// const users_raw =computedAsync(() => userService.getAll());

// const asyncData = computedAsync(async () => {
//   return await Promise.all([
//     menuCategService.getStationsCategories(), orderItemService.getAll(), orderService.getAll(), menuItemService.getAll(), userService.getAll()
//   ])
// }, [[], [], [], [], []] as const);
// const { value: [allStationnames_raw, OrderItems_raw, Orders_raw, menu_items_raw, users_raw] } = toRefs(asyncData);
// console.log("users:", users_raw.value)
// console.log("stations:", allStationnames_raw.value)
// for (let station of allStationnames_raw._value){
//   console.log(station)
// }
//  const allStationnames

const debouncedWatchCallback = debounce(async (newValues: any, oldValues: any) => {
  // console.log("menuitem", menuItemService.getAllMenuItemsWithCategoryID("m6l80c3w6te7611"))
  StationDictMenuitem()
  console.log("&&&&&&&&&&&&&&&",environment.allStationnames_raw)
  console.log("NEUE BESTELLUNG IST DRIN")
  if (newValues.allStationnames_raw && newValues.Orders_raw && newValues.users_raw &&newValues.menu_items_raw && allStationnames) {
    // Zugriff auf die Daten, sobald sie geladen sind
    // for (let station of allStationnames_raw){
    //   allStationnames.push(station.name)
    //   console.log("station:", station.name)
    // }
    console.log("____________________")
    const newOrders = await Promise.all(newValues.Orders_raw.map(async (Order: any) => {
      for (let station of allStationnames){
        console.log(station, allStationnames)
        const temp3 = newValues.menu_items_raw?.map((Item: any)=> Item.id)
        console.log("temp3", newValues.users_raw)
        return {[station]:<Order>{
          id: String(Order.id),
          table: String(Order.table),
          // waiter: waiter.name ?? waiter.username, //returns waiterID
          waiter: newValues.users_raw?.find((User: any)=> User.id == Order.waiter)?.username ?? "not loading",
          // waiter: Order.waiter,
          time: new Date(Order.created).toLocaleTimeString('de-DE', {hour: "2-digit", minute: "2-digit" }) + " Uhr", //Item.menu_item.map((ID)=>ID == menu_items_raw?.)
          state: false,
          orderlist: await Promise.all(newValues.OrderItems_raw?.
              filter((OrderItem: any) => OrderItem.order === Order.id).  //take all Items from Orderitemsraw where their ID is the same as from Order
              // filter((OrderItem3)=> stationsDict[OrderItem3.menu_item])
              // filter((OrderItem3)=> (await menuCategService.getById(menuItemService.getById(OrderItem3.menu_item)).name === "Crepes")).

              // filter((OrderItem2)=> allStationnames_raw?.  //keep all items for on station
              //     map((STAT)=> STAT.name).      //have all station.names
              //     filter((XYZ) => menu_items_raw?.    
              //     filter((MenuItem)=> MenuItem.id === OrderItem2.menu_item)?.  //keep the only stationname that is realted to this Order
              //     map((MenuItem2)=>MenuItem2.category).
              //     filter(()=> XYZ)) ?? 
              //     STAT === "Crepes").  //compare to station.names

              map(async (Item: any) => ({
            name: newValues.menu_items_raw?.find((Item2: any) => Item2.id === Item.menu_item)?.name,
            notes: Item.notes,
            clicked: false
          })) ?? []),
          allclicked: false,
        }};
      }}));
    console.log("newOrders:", newOrders, allStationnames);
    for (let newOrder of newOrders){
      for (let station of allStationnames){
        // console.log("here:", newOrder[station]??[], station)
        if (newOrder[station]){
          if (newOrder[station]["orderlist"].length){
            console.log("added:", newOrder[station])
            allOrders[station].push(newOrder[station])
          }
        }
      }
    }
  }
}, 500);

watch(environment, debouncedWatchCallback, { deep: true });

function StationDictMenuitem(){
  const stationsDict = {}
  if (Array.isArray(environment.menu_items_raw)&&Array.isArray(environment.allStationnames_raw)&&Array.isArray(environment.OrderItems_raw)){
  for (let temp_menuitem of environment.menu_items_raw){
    // console.log("menuitems", temp_menuitem)
    let temp_category = temp_menuitem.category
    let temp_id = temp_menuitem.id
    for (let temp_orderitem of environment.OrderItems_raw){
      if (temp_orderitem.menu_item == temp_id){
      for (let temp_station of environment.allStationnames_raw)
        if (temp_station.id == temp_menuitem.category){
          let temp_station_name = temp_station.name
          Object.assign(stationsDict, {[temp_id]: temp_station_name})
        }
      }
    }
  }}
  console.log("dict:", stationsDict) //["57vya5pa711gnk7"])
  console.log(environment.allStationnames_raw)
}


export interface OrderItem {
  /** Name of the item ordered */
  name: string;           
  /** Additional notes specific to this item */
  notes: string;
  /**  Indicates if the item has been processed */
  clicked: boolean;
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
  /** Station name maps to an array of orders */
  [stationName: FoodStationName]: Order[];
}

export const allStationnames = reactive<FoodStationName[]>([]);

export const allOrders = reactive<AllOrders>({
//   Crepes: [
//     {
//       id: '0',
//       table: '2',
//       waiter: 'Lea',
//       time: '12:45 Uhr',
//       state: false,
//       allclicked: false,
//       orderlist: [
//         { name: 'nutella das von vorneherein viele Special Zutaten hat', notes: 'Extra Sahne' , clicked: false },
//         { name: 'Banane', notes: '' , clicked: false },
//         { name: 'Käseschinken', notes: 'Ohne Käse' , clicked: false }
//       ],
//     },
//     {
//       id: '1',
//       table: '3',
//       waiter: 'Sylvie',
//       time: '12:50 Uhr',
//       state: false,
//       allclicked: false,
//       orderlist: [
//         { name: 'Zucker & Zimt', notes: '' , clicked: false },
//         { name: 'nutella', notes: 'Zusätzlicher Löffel Nutella und gaaaanz viele andere Extrawünsche. Zusätzlicher Löffel Nutella und gaaaanz viele andere Extrawünsche' , clicked: false },
//         { name: 'Erdbeer', notes: '' , clicked: false },
//         { name: 'Zucker', notes: '' , clicked: false }
//       ],
//     },
//     {
//       id: '2',
//       table: '9',
//       waiter: 'Sylvie',
//       time: '12:56 Uhr',
//       state: false,
//       allclicked: false,
//       orderlist: [
//         { name: 'Zucker & Zimt', notes: '' , clicked: false },
//       ],
//     },
//     {
//       id: '3',
//       table: '1',
//       waiter: 'Sabine',
//       time: '12:59 Uhr',
//       state: false,
//       allclicked: false,
//       orderlist: [
//         { name: 'Erdbeer', notes: '' , clicked: false },
//         { name: 'Zucker & Zimt', notes: 'Leicht bestreut', clicked: false  },
//         { name: 'Banane', notes: '' , clicked: false },
//         { name: 'Zucker', notes: '', clicked: false  }
//       ],
//     },
//     {
//       id: '4',
//       table: '3',
//       waiter: 'Sylvie',
//       time: '13:04 Uhr',
//       state: false,
//       allclicked: false,
//       orderlist: [
//         { name: 'Apfel', notes: '' , clicked: false },
//         { name: 'Käseschinken', notes: '' , clicked: false },
//         { name: 'Schokolade', notes: '', clicked: false  }
//       ],
//     }
//   ],
//   Sandwiches: [
//     {
//       id: '0',
//       table: '4',
//       waiter: 'Martin',
//       time: '17:89 Uhr',
//       state: false,
//       allclicked: false,
//       orderlist: [
//         { name: 'Käse', notes: '' , clicked: false }
//       ],
//     },
//     {
//       id: '1',
//       table: '6',
//       waiter: 'Robin',
//       time: '14 Uhr',
//       state: false,
//       allclicked: false,
//       orderlist: [
//         { name: 'Käse', notes: '' , clicked: false }
//       ],
//     }
//   ],
});

export const trashcan = reactive<Record<string, Order["id"][]>>({})

// adds all unassigned stationnames to allOrders as empty list
watch(allStationnames, (newStationnames) => {
  newStationnames.forEach(stationName => {
    if (!allOrders[stationName]) {
      allOrders[stationName] = [];
    }
    if (!trashcan[stationName]){
      trashcan[stationName] =[]
    }
  });
}, { deep: true, immediate: true });

function addStation(Stationname: string){
  if (!allOrders[Stationname]) {
    allOrders[Stationname] = []
    console.log("added Station")
    }
}
function addtrashcan(Stationname: string){
  if (!trashcan[Stationname]) {
    trashcan[Stationname] = []
    console.log("added Station")
    }
}