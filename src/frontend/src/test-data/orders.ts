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
    { id: '4', table: '3', waiter: 'Sylvie', time: '16:07 Uhr', state: false , orderlist: ['Zucker & Zimt', 'nutella', 'Käseschinken',], allclicked: false, clicked: [false,false,false,false]},
    { id: '8', table: '3', waiter: 'Sylvie', time: '16:07 Uhr', state: false , orderlist: ['Zucker & Zimt',  'Käseschinken', 'Zucker'], allclicked: false, clicked: [false,false,false,false]},
    { id: '10', table: '3', waiter: 'Sylvie', time: '16:07 Uhr', state: false , orderlist: [ 'nutella', 'Käseschinken', 'Zucker'], allclicked: false, clicked: [false,false,false,false]},
    { id: '7', table: '3', waiter: 'Sylvie', time: '16:07 Uhr', state: false , orderlist: ['Zucker & Zimt', 'nutella', 'Zucker'], allclicked: false, clicked: [false,false,false,false]},
    { id: '12', table: '2', waiter: 'Lea', time: '16:03 Uhr' , state: false, orderlist: ['nutella', 'nutella', 'Käseschinken'], allclicked: false, clicked: [false,false,false]},
  ],
  Sandwiches: [
    { id: '0', table: '4', waiter: 'Martin', time: '17:89 Uhr', state: false, orderlist: ['Käse'], allclicked: false, clicked: [false]},
    { id: '1', table: '6', waiter: 'Robin', time: '14 Uhr' , state: false, orderlist: ['Käse'], allclicked: false, clicked: [false]},
  ],
  'Kaltgetränke': [],
  'Heißgetränke': [],
});