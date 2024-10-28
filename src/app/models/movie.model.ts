// src/app/models/movie.model.ts
export type Movie ={
  id: number;
  name: string;
  price: number; // Ensure this is a number for calculations
  rating: number;
  src: string; // Source for the image
  releasedate: string;
  genre: string;
  language: string; 
  isWishListed?:boolean;
  quantity:number;// Optional property to track if it's in the wishlist
}
