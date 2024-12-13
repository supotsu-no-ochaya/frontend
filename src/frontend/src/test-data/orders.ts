import { reactive } from "vue";

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
        { name: 'nutella', notes: 'Zusätzlicher Löffel Nutella' , clicked: false },
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

export function addOrder(category: string, orderId: String, orderTable: String, orderWaiter: String, orderlist: any[], orderNotes: any[]) {
  const newOrder = {
      id: String(orderId),
      table: String(orderTable),
      waiter: orderWaiter,
      time: new Date().toLocaleTimeString('de-DE', { hour: "2-digit", minute: "2-digit" }) + ' Uhr', // Zeit wird automatisch hinzugefügt
      state: false,
      orderlist: orderlist,
      allclicked: false,
      clicked: orderlist.map(() => false), // Für jeden Eintrag in orderlist wird false hinzugefügt
      notes: orderNotes // Bemerkungen zur Bestellung
  };

  // Überprüfen, ob die Kategorie existiert
  if (!allOrders[category]) {
      console.error(`Kategorie "${category}" existiert nicht.`);
      return;
  }

  // Bestellung zur Kategorie hinzufügen
  allOrders[category].push(newOrder);

  console.log(`Neue Bestellung in Kategorie "${category}" hinzugefügt:`, newOrder);
}

// addOrder('Sandwiches', 
//     '13', 
//     '2', 
//     'Lea', 
//     ['Nutella', 'Banane'], 
//     [false, 'Extra Sahne']);
