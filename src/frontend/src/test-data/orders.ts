import { reactive } from "vue";

interface orderItem {
  name: string;           // Name of the item ordered
  notes: string;          // Additional notes specific to this item
  clicked: boolean;       // Indicates if the item has been processed
}

// Interface representing an individual order
interface Order {
  id: string;             // Unique identifier for the order
  table: string;          // Table number where the order was placed
  waiter: string;         // Name of the waiter serving this order
  time: string;           // Time when the order was taken
  state: boolean;         // State of the order (eg, completed or not)
  allclicked: boolean;    // Indicates if all items in the order are clicked/processed
  orderlist: orderItem[]; // List of items in the order
}

// Interface representing a category of orders, such as Crepes or Sandwiches
interface stationName {
  [stationName: string]: Order[]; // Station name maps to an array of orders
}

// Interface representing the entire collection of all orders for all stations
interface AllOrders {
  stations: stationName;  // A mapping of station names to their respective orders
}

export const allStationnames = reactive(['Crepes', 'Sandwiches', 'Heißgetränke', 'Kaltgetränke', 'Station neu']);

export const allOrders = reactive({
  Crepes: [
    {
      id: '0',
      table: '2',
      waiter: 'Lea',
      time: '12:45 Uhr',
      state: false,
      allclicked: false,
      orderlist: [
        { name: 'nutella', notes: 'Extra Sahne' , clicked: false },
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
        { name: 'nutella', notes: 'Zusätzlicher Löffel Nutella und gaaaanz viele andere Extrawünsche' , clicked: false },
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
  'Kaltgetränke': [],
  'Heißgetränke': []
});

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
