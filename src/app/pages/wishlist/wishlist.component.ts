// src/app/pages/wishlist/wishlist.component.ts
import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { Movie } from '../../models/movie.model';
import { UtilityService } from './../../services/utility.service';
import { CartService } from './../../services/cart.service'; // Import CartService
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  wishlistMovies: Movie[] = [];

  constructor(
    private wishlistService: WishlistService,
    private utilityService: UtilityService, // Inject UtilityService
    private cartService: CartService, // Inject CartService
    private router: Router // Inject Router
  ) {}

  ngOnInit(): void {
    this.loadWishlistMovies();
  }

  loadWishlistMovies(): void {
    this.wishlistMovies = this.wishlistService.getWishlistMovies();
  }

  removeFromWishlist(movie: Movie): void {
    this.wishlistService.removeFromWishlist(movie);
    this.loadWishlistMovies();
  }

  buyNow(movie: Movie): void {
    const cartItem = {
      id: movie.id,
      name: movie.name,
      price: movie.price,
      quantity: 1,
      rating: movie.rating,
      imageUrl: movie.src
    };

    this.cartService.addToCart(cartItem);
    this.router.navigate(['/checkout']); // Navigate to the checkout page
  }

  getStars(rating: number): number[] {
    return this.utilityService.getStars(rating); // Implement this method as needed
  }
}
