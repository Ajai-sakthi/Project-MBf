export interface CartItem {
  id: number;       // or string, depending on your ID type
  title: string;
  price: number;
  quantity: number; // This property is required
  imageUrl?: string; // Optional property for the image URL
}
