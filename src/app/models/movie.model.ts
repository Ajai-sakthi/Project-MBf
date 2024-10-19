// src/app/models/movie.model.ts
export interface Movie {
  id: number;
  name: string;
  price: string; // Ensure this is a number for calculations
  rating: number;
  src: string; // Source for the image
  releasedate: string;
  genre: string;
  language: string;
  inWishlist?: boolean; // Optional property to track if it's in the wishlist
}
