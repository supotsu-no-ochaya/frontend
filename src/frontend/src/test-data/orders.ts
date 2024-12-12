import { reactive } from "vue";

export const allStationnames = reactive(['Crepes', 'Sandwiches', 'Heißgetränke', 'Kaltgetränke', 'Station neu']);


export const allOrders = reactive({
  Crepes: [
    { id: '0', table: '2', waiter: 'Lea', time: '16:03 Uhr' , state: false, allclicked: false,
            orderlist: ['nutella', 'nutella', 'Käseschinken'],
            clicked: [false,false,false]},

    { id: '1', table: '3', waiter: 'Sylvie', time: '16:07 Uhr', state: false , orderlist: ['Zucker & Zimt', 'nutella', 'Käseschinken', 'Zucker'], allclicked: false, clicked: [false,false,false,false]},
    { id: '2', table: '3', waiter: 'Sylvie', time: '16:07 Uhr', state: false , orderlist: ['Zucker & Zimt', 'nutella', 'Käseschinken', 'Zucker'], allclicked: false, clicked: [false,false,false,false]},
    { id: '3', table: '3', waiter: 'Sylvie', time: '16:07 Uhr', state: false , orderlist: ['Zucker & Zimt', 'nutella', 'Käseschinken', 'Zucker'], allclicked: false, clicked: [false,false,false,false]},
    { id: '5', table: '3', waiter: 'Sylvie', time: '16:07 Uhr', state: false , orderlist: ['Zucker & Zimt', 'nutella', 'Käseschinken', 'Zucker'], allclicked: false, clicked: [false,false,false,false]},
    { id: '6', table: '3', waiter: 'Sylvie', time: '16:07 Uhr', state: false , orderlist: ['Zucker & Zimt', 'nutella', 'Käseschinken', 'Zucker'], allclicked: false, clicked: [false,false,false,false]},
    { id: '9', table: '3', waiter: 'Sylvie', time: '16:07 Uhr', state: false , orderlist: ['Zucker & Zimt', 'nutella', 'Käseschinken', 'Zucker'], allclicked: false, clicked: [false,false,false,false]},
    { id: '11', table: '3', waiter: 'Sylvie', time: '16:07 Uhr', state: false , orderlist: ['Zucker & Zimt', 'nutella', 'Käseschinken', 'Zucker'], allclicked: false, clicked: [false,false,false,false]},
    { id: '4', table: '3', waiter: 'Sylvie', time: '16:07 Uhr', state: false , orderlist: ['Zucker & Zimt', 'nutella', 'Käseschinken',], allclicked: false, clicked: [false,false,false]},
    { id: '8', table: '3', waiter: 'Sylvie', time: '16:07 Uhr', state: false , orderlist: ['Zucker & Zimt',  'Käseschinken', 'Zucker'], allclicked: false, clicked: [false,false,false]},
    { id: '10', table: '3', waiter: 'Sylvie', time: '16:07 Uhr', state: false , orderlist: [ 'nutella', 'Käseschinken', 'Zucker'], allclicked: false, clicked: [false,false,false]},
    { id: '7', table: '3', waiter: 'Sylvie', time: '16:07 Uhr', state: false , orderlist: ['Zucker & Zimt', 'nutella', 'Zucker'], allclicked: false, clicked: [false,false,false]},
    { id: '12', table: '2', waiter: 'Lea', time: '16:03 Uhr' , state: false, orderlist: ['nutella', 'nutella', 'Käseschinken'], allclicked: false, clicked: [false,false,false]},
  ],
  Sandwiches: [
    { id: '0', table: '4', waiter: 'Martin', time: '17:89 Uhr', state: false, orderlist: ['Käse'], allclicked: false, clicked: [false]},
    { id: '1', table: '6', waiter: 'Robin', time: '14 Uhr' , state: false, orderlist: ['Käse'], allclicked: false, clicked: [false]},
  ],
  'Kaltgetränke': [],
  'Heißgetränke': [],
});

export function addOrder(category: string, orderId: String, orderTable: String, orderWaiter: String, orderlist: any[], orderNotes: string) {
  const newOrder = {
      id: String(orderId),
      table: String(orderTable),
      waiter: orderWaiter,
      time: new Date().toLocaleTimeString('de-DE'), // Zeit wird automatisch hinzugefügt
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

addOrder('Sandwiches', 
    '13', 
    '2', 
    'Lea', 
    ['Nutella', 'Banane'], 
    'Extra Sahne');