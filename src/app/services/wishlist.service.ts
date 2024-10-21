import { Injectable } from '@angular/core';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private wishlist: Movie[] = []; // Array to hold wishlist items

  // Add a movie to the wishlist
  addToWishlist(movie: Movie): void {
    if (!this.isInWishlist(movie)) {
      this.wishlist.push(movie);
      console.log(`${movie.name} added to wishlist!`);
    }
  }

  // Remove a movie from the wishlist
  removeFromWishlist(movie: Movie): void {
    this.wishlist = this.wishlist.filter(item => item.id !== movie.id);
    console.log(`${movie.name} removed from wishlist!`);
  }

  // Check if a movie is in the wishlist
  isInWishlist(movie: Movie): boolean {
    return this.wishlist.some(item => item.id === movie.id);
  }

  // Get all movies in the wishlist
  getWishlist(): Movie[] {
    return this.wishlist; // Return the current wishlist
  }
}
