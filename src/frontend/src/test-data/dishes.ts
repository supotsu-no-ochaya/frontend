interface Dish {
  label: string
  icon?: string
  price: number
}

interface DishCategory {
  label: string
  icon?: string
  elements: Dish[]
}

interface FoodCategory {
  label: string
  icon?: string
  categories: {
    [key: string]: DishCategory
  }
}

interface DishMap {
  [key: string]: FoodCategory;
}


export const dishes: DishMap = {
  food: {
    label: "Essen",
    categories: {
      mochi: {
        label: "Mochi",
        elements: [
          {
            label: "Nutella",
            price: 2.50,
          },
          {
            label: "Spekulatiuscreme",
            price: 2.50,
          },
          {
            label: "Rote Bohnenpaste",
            price: 2.50,
          },
        ],
      },
      crepes: {
        label: "Crepes",
        elements: [
          {
            label: "Zimt-Zucker",
            price: 3.50,
          },
          {
            label: "Apfelmuß",
            price: 3.50,
          },
          {
            label: "Zimt-Zucker & Apfelmuß",
            price: 4.50,
          },
          {
            label: "Nutella",
            price: 4.50,
          },
          {
            label: "Spekulatiuscreme",
            price: 4.50,
          },
          {
            label: "Käse-Schinken",
            price: 4.50,
          },
        ],
      },
      onigiri: {
        label: "Onigiri",
        elements: [
          {
            label: "Ei-Mais",
            price: 3.50,
          },
          {
            label: "Tofu",
            price: 3.50,
          },
          {
            label: "Hackfleisch",
            price: 4.00,
          },
          {
            label: "Thunfisch-Mayo",
            price: 4.00,
          },
        ],
      },
      sandwiches: {
        label: "Sanwiches",
        elements: [
          {
            label: "Ei-Mais",
            price: 3.50,
          },
          {
            label: "Tofu",
            price: 3.50,
          },
          {
            label: "Käse-Schinken",
            price: 3.80,
          },
          {
            label: "Käse-Salami",
            price: 3.80,
          },
        ],
      },
    }
  },
  drinks: {
    label: "Getränke",
    categories: {
      softdrinks: {
        label: "Softdrinks",
        elements: [
          {
            label: "Cola",
            price: 3.50,
          },
          {
            label: "Cola Light",
            price: 3.50,
          },
          {
            label: "Fanta",
            price: 3.50,
          },
          {
            label: "Sprite",
            price: 3.50,
          },
          {
            label: "Mineralwasser",
            price: 3.50,
          },
          {
            label: "Leitungswasser",
            price: 0.50,
          },
        ],
      },
      hotDrinks: {
        label: "Heißgetränke",
        elements: [
          {
            label: "Kaffee",
            price: 3.00,
          },
          {
            label: "Kaffee (mit Milch)",
            price: 3.30,
          },
          {
            label: "Tee (mit Milch)",
            price: 2.60,
          },
          {
            label: "Tee (mit Milch)",
            price: 2.90,
          },
        ],
      },
    }
  },
}
