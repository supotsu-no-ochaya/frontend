import { computedAsync } from "@vueuse/core";
import { reactive, toRefs, watch } from "vue";
import { menuCategService } from "@/services/menu/menuCategService";
import { orderItemService } from "@/services/order/orderItemService";
import { orderService } from "@/services/order/orderService";
import { menuItemService } from "@/services/menu/menuItemService";
import { userService } from "@/services/user/userService";
import { debounce } from "lodash";
//TODO debounce von vue.use
import { OrderStatus } from "@/interfaces/order/Order";

const environment = reactive({
  allStationnames_raw: computedAsync(() => menuCategService.getStationsCategories()),
  OrderItems_raw: computedAsync(() => orderItemService.getAll()),
  Orders_raw: computedAsync(() => orderService.getAll()),
  menu_items_raw: computedAsync(() => menuItemService.getAll()),
  users_raw: computedAsync(() => userService.getAll()),
});

let knownIds = new Set(); // local storage of fetched Data by ID

async function fetchChanges(all_records: any) {
  // find new data
  const newOrChanged = all_records.filter((item: any) => !knownIds.has(item.id));
  // add new IDs to list
  newOrChanged.forEach((item: any) => knownIds.add(item.id));

  return newOrChanged;
}

// Add IDs of Mounted Data after 12 secs
async function addFetchedIDs(){
  let temp_1 = Promise.all(await fetchChanges(await environment.allStationnames_raw))
  let temp_2 = Promise.all(await fetchChanges(await environment.OrderItems_raw))
  let temp_3 = Promise.all(await fetchChanges(await environment.Orders_raw))
  let temp_4 = Promise.all(await fetchChanges(await environment.menu_items_raw))
  let temp_5 = Promise.all(await fetchChanges(await environment.users_raw))
}

setTimeout(() => {
  addFetchedIDs();
}, 12_000);


// syncs new data every 20 sec
setInterval(async () => {
  let temp_1 = await fetchChanges(await menuCategService.getStationsCategories())
  let temp_2 = await fetchChanges(await orderItemService.getAll())
  let temp_3 = await fetchChanges(await orderService.getAll())
  let temp_4 = await fetchChanges(await menuItemService.getAll())
  let temp_5 = await fetchChanges(await userService.getAll())

  if (temp_1.length){environment.allStationnames_raw = temp_1}
  if (temp_2.length){environment.OrderItems_raw = temp_2}
  if (temp_3.length){environment.Orders_raw = temp_3}
  if (temp_4.length){environment.menu_items_raw = temp_4}
  if (temp_5.length){environment.users_raw = temp_5}
}, 20_000);

// adds all stations
watch(()=>environment.allStationnames_raw, (newStationnames)=>{
  if (Array.isArray(environment.allStationnames_raw)) {
    // Zugriff auf die Daten, sobald sie geladen sind
    for (let station of environment.allStationnames_raw){
      if (!["Mochi", "Onigiri"].includes(station.name)){
        allStationnames.push(station.name)
      }
    }
  }
});

// main fct for adding new Orders
const addNewOrders = debounce(async (newValues: any, oldValues: any) => {
  // Zugriff auf die Daten, sobald sie geladen sind
  if (newValues.allStationnames_raw && newValues.Orders_raw && newValues.users_raw &&newValues.menu_items_raw && allStationnames) {
    for (let station of allStationnames){
      const newOrders = await Promise.all(newValues.Orders_raw.map(async (Order: any) => {
        const temp3 = newValues.menu_items_raw?.map((Item: any)=> Item.id)
        if (Order.status === OrderStatus.Aufgegeben){
          return {[station]:<Order>{
            id: String(Order.id),
            table: String(Order.table),
            waiter: newValues.users_raw?.find((User: any)=> User.id == Order.waiter)?.username ?? "not loading",
            time: new Date(Order.created).toLocaleTimeString('de-DE', {hour: "2-digit", minute: "2-digit" }) + " Uhr", //Item.menu_item.map((ID)=>ID == menu_items_raw?.)
            state: false,
            orderlist: await Promise.all(newValues.OrderItems_raw?.
               //take all Items from Orderitemsraw where their ID is the same as from Order
                filter((OrderItem: any) => OrderItem.order === Order.id). 
                filter((OrderItem2: any) => newValues.allStationnames_raw?.
                    find((Item4: any)=> Item4.id === newValues.menu_items_raw?.
                    find((menitem: any)=> menitem.id === temp3.
                    find((temp: string)=> temp === OrderItem2.menu_item))?.category)?.name === station).
                map(async (Item: any) => ({
              name: newValues.menu_items_raw?.find((Item2: any) => Item2.id === Item.menu_item)?.name,
              notes: Item.notes,
              clicked: false
            })) ?? []),
            allclicked: false,
          }};
        } else{return {}}}
      ));
      console.log(newOrders)
      for (let newOrder of newOrders){
        for (let station of allStationnames){
          if (newOrder[station]){
            // only if there are Order_items within an Order
            if (newOrder[station]["orderlist"].length){
              allOrders[station].push(newOrder[station])
            }
          } 
        }
      }
    }
    console.log("NEUE BESTELLUNG IST DRIN")
  }
}, 500);

// if new entry in env, execute addNewOrders
watch(environment, addNewOrders, { deep: true });

// give every Menu_item a Station and save it locally to avoid severus PB-requests
//TODO delete this
// function StationDictMenuitem(){
//   const stationsDict = {}
//   if (Array.isArray(environment.menu_items_raw)&&Array.isArray(environment.allStationnames_raw)&&Array.isArray(environment.OrderItems_raw)){
//   for (let temp_menuitem of environment.menu_items_raw){
//     let temp_category = temp_menuitem.category
//     let temp_id = temp_menuitem.id
//     for (let temp_orderitem of environment.OrderItems_raw){
//       if (temp_orderitem.menu_item == temp_id){
//       for (let temp_station of environment.allStationnames_raw)
//         if (temp_station.id == temp_menuitem.category){
//           let temp_station_name = temp_station.name
//           Object.assign(stationsDict, {[temp_id]: temp_station_name})
//         }
//       }
//     }
//   }}
// }


//* here are All InterFfaces necessary for allOrders

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
  /** Unique identifier for the order */
  id: string;
  /** Table number where the order was placed */
  table: string;          
  /** Name of the waiter serving this order */
  waiter: string;
  /**  Time when the order was taken */
  time: string;          
  /**  State of the order (eg, completed or not) */
  state: boolean; 
  /**  Indicates if all items in the order are clicked/processed */
  allclicked: boolean;
  /**  List of items in the order */
  orderlist: OrderItem[]; 
}

type FoodStationName = string;

//* Interface representing the entire collection of all orders for all stations
export interface AllOrders {
  /** Station name maps to an array of orders */
  [stationName: FoodStationName]: Order[];
}


export const allStationnames = reactive<FoodStationName[]>([]);

export const allOrders = reactive<AllOrders>({
//TODO delete testdata
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

//* temp storage for completed Orders for restoring
export const trashcan = reactive<Record<string, Order["id"][]>>({})

//* adds all unassigned stationnames to allOrders as empty list
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
    }
}

function addtrashcan(Stationname: string){
  if (!trashcan[Stationname]) {
    trashcan[Stationname] = []
    }
}