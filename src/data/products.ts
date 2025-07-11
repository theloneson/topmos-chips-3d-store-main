
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  weight: string;
  image: string;
  type: 'ripe' | 'unripe';
  size: 'small' | 'medium' | 'large' | 'jumbo';
  inStock: boolean;
  featured: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Large Unripe Plantain Chips",
    description: "Crunchy unripe plantain chips, perfect for a healthy snack. Our unripe plantain chips are made from carefully selected plantains, thinly sliced and perfectly fried to give you that satisfying crunch with every bite.",
    price: 4000,
    weight: "500g",
    image: "/lovable-uploads/039c9d1e-5c9a-4a65-b717-4e39b3c7e108.png",
    type: "unripe",
    size: "large",
    inStock: true,
    featured: true,
  },
  {
    id: "2",
    name: "Medium Ripe Plantain Chips",
    description: "Sweet and crunchy ripe plantain chips, naturally sweet and delicious. These chips are made from ripe plantains that are carefully sliced and fried to perfection.",
    price: 3000,
    weight: "250g",
    image: "/lovable-uploads/4d23db1e-d9f2-4496-be39-a3afcbbcc9da.png",
    type: "ripe",
    size: "medium",
    inStock: true,
    featured: false,
  },
  {
    id: "3",
    name: "Jumbo Ripe Plantain Chips",
    description: "Our largest size of sweet and crunchy ripe plantain chips. Perfect for sharing or for those who just can't get enough of our delicious plantain chips!",
    price: 12000,
    weight: "1.8kg",
    image: "/lovable-uploads/3de3e712-de47-4f32-8c35-f8d2a0624a0c.png",
    type: "ripe",
    size: "jumbo",
    inStock: true,
    featured: true,
  },
  {
    id: "4",
    name: "Large Ripe Plantain Chips",
    description: "Sweet and crunchy ripe plantain chips in our popular large size. Made from perfectly ripened plantains for that ideal balance of sweetness and crunch.",
    price: 4000,
    weight: "500g",
    image: "/lovable-uploads/36be43fe-e0a3-4597-94c8-244ebd1f5b30.png",
    type: "ripe",
    size: "large",
    inStock: true,
    featured: true,
  },
  {
    id: "5",
    name: "Small Ripe Plantain Chips",
    description: "Our convenient small size of sweet and crunchy ripe plantain chips. Perfect for on-the-go snacking or for first-time tasters.",
    price: 2500,
    weight: "180g",
    image: "/lovable-uploads/fd65d420-cbd6-4bec-8c06-67aab00cef20.png",
    type: "ripe",
    size: "small",
    inStock: true,
    featured: false,
  }
];

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
