// src/app/services/wishlist.service.ts
import { Injectable } from '@angular/core';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlist: Movie[] = [];

  addToWishlist(movie: Movie): void {
    if (!this.isInWishlist(movie)) {
      this.wishlist.push(movie);
    }
  }

  removeFromWishlist(movie: Movie): void {
    this.wishlist = this.wishlist.filter(item => item.id !== movie.id);
  }

  isInWishlist(movie: Movie): boolean {
    return this.wishlist.some(item => item.id === movie.id);
  }

  getWishlistMovies(): Movie[] {
    return this.wishlist;
  }
}
