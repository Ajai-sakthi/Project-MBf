// src/app/models/cart-item.model.ts
import { Movie } from './movie.model'; // Import the Movie interface

// src/app/models/cart-item.model.ts
export interface CartItem {
  id: number; // ID of the movie
  name: string;
  price: string; // Keep as string
  quantity: number;
  rating: number;
  src: string; // Add this property
  imageUrl: string; // You can keep both if needed
  movie: Movie; // Include the entire movie object
}


