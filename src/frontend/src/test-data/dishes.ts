import FoodIconSrc from "./icons/food.svg";
import DrinkIconSrc from "./icons/drink.svg";
import CrepeIconSrc from "./icons/crepe.svg";
import MochiIconSrc from "./icons/mochi.svg";
import OnigiriIconSrc from "./icons/onigiri.svg";
import SandwichIconSrc from "./icons/sandwich.svg";


interface Dish {
  label: string
  iconSrc: string
  price: number
}

interface DishCategory {
  label: string
  iconSrc: string
  elements: Dish[]
}

interface FoodCategory {
  label: string
  iconSrc: string
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
    iconSrc: FoodIconSrc,
    categories: {
      mochi: {
        label: "Mochi",
        iconSrc: MochiIconSrc,
        elements: [
          {
            label: "Nutella",
            iconSrc: MochiIconSrc,
            price: 2.50,
          },
          {
            label: "Spekulatiuscreme",
            iconSrc: MochiIconSrc,
            price: 2.50,
          },
          {
            label: "Rote Bohnenpaste",
            iconSrc: MochiIconSrc,
            price: 2.50,
          },
        ],
      },
      crepes: {
        label: "Crepes",
        iconSrc: CrepeIconSrc,
        elements: [
          {
            label: "Zimt-Zucker",
            iconSrc: CrepeIconSrc,
            price: 3.50,
          },
          {
            label: "Apfelmuß",
            iconSrc: CrepeIconSrc,
            price: 3.50,
          },
          {
            label: "Zimt-Zucker & Apfelmuß",
            iconSrc: CrepeIconSrc,
            price: 4.50,
          },
          {
            label: "Nutella",
            iconSrc: CrepeIconSrc,
            price: 4.50,
          },
          {
            label: "Spekulatiuscreme",
            iconSrc: CrepeIconSrc,
            price: 4.50,
          },
          {
            label: "Käse-Schinken",
            iconSrc: CrepeIconSrc,
            price: 4.50,
          },
        ],
      },
      onigiri: {
        label: "Onigiri",
        iconSrc: OnigiriIconSrc,
        elements: [
          {
            label: "Ei-Mais",
            iconSrc: OnigiriIconSrc,
            price: 3.50,
          },
          {
            label: "Tofu",
            iconSrc: OnigiriIconSrc,
            price: 3.50,
          },
          {
            label: "Hackfleisch",
            iconSrc: OnigiriIconSrc,
            price: 4.00,
          },
          {
            label: "Thunfisch-Mayo",
            iconSrc: OnigiriIconSrc,
            price: 4.00,
          },
        ],
      },
      sandwiches: {
        label: "Sanwiches",
        iconSrc: SandwichIconSrc,
        elements: [
          {
            label: "Ei-Mais",
            iconSrc: SandwichIconSrc,
            price: 3.50,
          },
          {
            label: "Tofu",
            iconSrc: SandwichIconSrc,
            price: 3.50,
          },
          {
            label: "Käse-Schinken",
            iconSrc: SandwichIconSrc,
            price: 3.80,
          },
          {
            label: "Käse-Salami",
            iconSrc: SandwichIconSrc,
            price: 3.80,
          },
        ],
      },
    }
  },
  drinks: {
    label: "Getränke",
    iconSrc: DrinkIconSrc,
    categories: {
      softdrinks: {
        label: "Softdrinks",
        iconSrc: DrinkIconSrc,
        elements: [
          {
            label: "Cola",
            iconSrc: DrinkIconSrc,
            price: 3.50,
          },
          {
            label: "Cola Light",
            iconSrc: DrinkIconSrc,
            price: 3.50,
          },
          {
            label: "Fanta",
            iconSrc: DrinkIconSrc,
            price: 3.50,
          },
          {
            label: "Sprite",
            iconSrc: DrinkIconSrc,
            price: 3.50,
          },
          {
            label: "Mineralwasser",
            iconSrc: DrinkIconSrc,
            price: 3.50,
          },
          {
            label: "Leitungswasser",
            iconSrc: DrinkIconSrc,
            price: 0.50,
          },
        ],
      },
      hotDrinks: {
        label: "Heißgetränke",
        iconSrc: DrinkIconSrc,
        elements: [
          {
            label: "Kaffee",
            iconSrc: DrinkIconSrc,
            price: 3.00,
          },
          {
            label: "Kaffee (mit Milch)",
            iconSrc: DrinkIconSrc,
            price: 3.30,
          },
          {
            label: "Tee (mit Milch)",
            iconSrc: DrinkIconSrc,
            price: 2.60,
          },
          {
            label: "Tee (mit Milch)",
            iconSrc: DrinkIconSrc,
            price: 2.90,
          },
        ],
      },
    }
  },
}
