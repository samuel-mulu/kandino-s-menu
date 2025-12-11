export type Category = "breakfast" | "lunch" | "dinner" | "treats"

export interface MenuItem {
  id: string
  name: string
  price: number
  rating: number
  image: string
  category: Category
  description: string
  ingredients: string[]
  calories: number
  isPopular?: boolean
}

export const categories: { id: Category; label: string }[] = [
  { id: "breakfast", label: "Breakfast" },
  { id: "lunch", label: "Lunch" },
  { id: "dinner", label: "Dinner" },
  { id: "treats", label: "Treats" },
]

export const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Avocado Toast",
    price: 14.0,
    rating: 4.5,
    image: "/avocado-toast-on-white-plate-with-seeds.jpg",
    category: "breakfast",
    description:
      "Fresh avocado spread on artisan sourdough bread, topped with cherry tomatoes, microgreens, and a sprinkle of everything bagel seasoning.",
    ingredients: [
      "Sourdough bread",
      "Fresh avocado",
      "Cherry tomatoes",
      "Microgreens",
      "Everything seasoning",
      "Olive oil",
    ],
    calories: 320,
    isPopular: true,
  },
  {
    id: "2",
    name: "Club Sandwich",
    price: 18.5,
    rating: 4.3,
    image: "/club-sandwich-with-fries-on-dark-plate.jpg",
    category: "breakfast",
    description:
      "Triple-decker sandwich with grilled chicken, crispy bacon, lettuce, tomato, and mayo on toasted bread. Served with golden fries.",
    ingredients: ["Toasted bread", "Grilled chicken", "Bacon", "Lettuce", "Tomato", "Mayo", "French fries"],
    calories: 650,
    isPopular: true,
  },
  {
    id: "3",
    name: "Wagyu Burger",
    price: 24.0,
    rating: 4.8,
    image: "/gourmet-wagyu-beef-burger-with-brioche-bun.jpg",
    category: "breakfast",
    description:
      "Premium wagyu beef patty with aged cheddar, caramelized onions, and house-made aioli on a toasted brioche bun.",
    ingredients: [
      "Wagyu beef patty",
      "Aged cheddar",
      "Caramelized onions",
      "Aioli",
      "Brioche bun",
      "Lettuce",
      "Tomato",
    ],
    calories: 780,
    isPopular: true,
  },
  {
    id: "4",
    name: "Caesar Salad",
    price: 12.0,
    rating: 4.2,
    image: "/caesar-salad-in-white-bowl-with-croutons.jpg",
    category: "breakfast",
    description:
      "Crisp romaine lettuce tossed with our signature Caesar dressing, parmesan shavings, and house-made croutons.",
    ingredients: ["Romaine lettuce", "Caesar dressing", "Parmesan cheese", "Croutons", "Black pepper"],
    calories: 280,
  },
  {
    id: "5",
    name: "Tiramisu",
    price: 9.0,
    rating: 4.7,
    image: "/tiramisu-dessert-slice-on-white-plate.jpg",
    category: "breakfast",
    description:
      "Classic Italian dessert with layers of espresso-soaked ladyfingers, mascarpone cream, and cocoa powder.",
    ingredients: ["Ladyfingers", "Espresso", "Mascarpone", "Cocoa powder", "Eggs", "Sugar"],
    calories: 420,
  },
  {
    id: "6",
    name: "Fruit Platter",
    price: 10.0,
    rating: 4.4,
    image: "/fresh-fruit-platter-with-melon-and-berries.jpg",
    category: "breakfast",
    description: "A refreshing selection of seasonal fresh fruits including melon, berries, grapes, and citrus.",
    ingredients: ["Watermelon", "Cantaloupe", "Strawberries", "Blueberries", "Grapes", "Orange"],
    calories: 150,
  },
  // Lunch items
  {
    id: "7",
    name: "Grilled Salmon",
    price: 28.0,
    rating: 4.9,
    image: "/grilled-salmon-vegetables.png",
    category: "lunch",
    description: "Fresh Atlantic salmon grilled to perfection, served with seasonal vegetables and lemon butter sauce.",
    ingredients: ["Atlantic salmon", "Asparagus", "Lemon", "Butter", "Herbs", "Olive oil"],
    calories: 450,
    isPopular: true,
  },
  {
    id: "8",
    name: "Pasta Carbonara",
    price: 19.0,
    rating: 4.6,
    image: "/creamy-pasta-carbonara-with-bacon.jpg",
    category: "lunch",
    description:
      "Classic Roman pasta with crispy pancetta, egg yolk, pecorino romano, and freshly ground black pepper.",
    ingredients: ["Spaghetti", "Pancetta", "Egg yolk", "Pecorino Romano", "Black pepper", "Parsley"],
    calories: 680,
  },
  {
    id: "9",
    name: "Thai Green Curry",
    price: 16.0,
    rating: 4.4,
    image: "/thai-green-curry-in-bowl-with-rice.jpg",
    category: "lunch",
    description: "Aromatic green curry with tender chicken, bamboo shoots, and Thai basil in coconut milk.",
    ingredients: ["Chicken", "Green curry paste", "Coconut milk", "Bamboo shoots", "Thai basil", "Rice"],
    calories: 520,
  },
  // Dinner items
  {
    id: "10",
    name: "Ribeye Steak",
    price: 42.0,
    rating: 4.9,
    image: "/ribeye-steak-with-herbs-on-plate.jpg",
    category: "dinner",
    description:
      "Prime 12oz ribeye steak, grilled to your preference, served with roasted potatoes and seasonal vegetables.",
    ingredients: ["Ribeye steak", "Roasted potatoes", "Seasonal vegetables", "Herb butter", "Sea salt"],
    calories: 850,
    isPopular: true,
  },
  {
    id: "11",
    name: "Lobster Risotto",
    price: 38.0,
    rating: 4.7,
    image: "/lobster-risotto-in-white-bowl.jpg",
    category: "dinner",
    description: "Creamy arborio rice with butter-poached lobster, saffron, and fresh herbs.",
    ingredients: ["Arborio rice", "Lobster", "Saffron", "Parmesan", "White wine", "Shallots"],
    calories: 720,
  },
  {
    id: "12",
    name: "Duck Confit",
    price: 34.0,
    rating: 4.5,
    image: "/duck-confit-with-crispy-skin-on-plate.jpg",
    category: "dinner",
    description: "Slow-cooked duck leg with crispy skin, served with duck fat potatoes and cherry reduction.",
    ingredients: ["Duck leg", "Duck fat", "Potatoes", "Cherries", "Thyme", "Garlic"],
    calories: 780,
  },
  // Treats
  {
    id: "13",
    name: "Chocolate Lava Cake",
    price: 11.0,
    rating: 4.8,
    image: "/chocolate-lava-cake-with-molten-center.jpg",
    category: "treats",
    description: "Warm chocolate cake with a molten center, served with vanilla ice cream and fresh berries.",
    ingredients: ["Dark chocolate", "Butter", "Eggs", "Sugar", "Flour", "Vanilla ice cream"],
    calories: 520,
    isPopular: true,
  },
  {
    id: "14",
    name: "Crème Brûlée",
    price: 10.0,
    rating: 4.6,
    image: "/creme-brulee-with-caramelized-sugar-top.jpg",
    category: "treats",
    description: "Classic French custard with a perfectly caramelized sugar crust and fresh vanilla bean.",
    ingredients: ["Heavy cream", "Vanilla bean", "Egg yolks", "Sugar", "Caramelized sugar"],
    calories: 380,
  },
  {
    id: "15",
    name: "Cheesecake",
    price: 9.5,
    rating: 4.5,
    image: "/new-york-cheesecake-slice-with-berry-sauce.jpg",
    category: "treats",
    description: "New York style cheesecake with graham cracker crust and mixed berry compote.",
    ingredients: ["Cream cheese", "Graham cracker", "Eggs", "Sugar", "Mixed berries", "Lemon"],
    calories: 450,
  },
]

export const getSectionTitle = (category: Category): string => {
  const titles: Record<Category, string> = {
    breakfast: "Morning Specials",
    lunch: "Lunch Favorites",
    dinner: "Evening Delights",
    treats: "Sweet Treats",
  }
  return titles[category]
}

export const getMenuItemById = (id: string): MenuItem | undefined => {
  return menuItems.find((item) => item.id === id)
}

export const getMenuItemsByCategory = (category: Category): MenuItem[] => {
  return menuItems.filter((item) => item.category === category)
}

export const getSimilarItems = (item: MenuItem, limit = 4): MenuItem[] => {
  return menuItems.filter((i) => i.category === item.category && i.id !== item.id).slice(0, limit)
}
