// src/app/pages/movie-list/movie-list.component.ts
import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';
import { WishlistService } from './../../services/wishlist.service';
import { UtilityService } from './../../services/utility.service';
import { CartService } from './../../services/cart.service'; // Import CartService
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];

  constructor(
    private movieService: MovieService,
    private wishlistService: WishlistService,
    private utilityService: UtilityService,
    private cartService: CartService, // Inject CartService
    private router: Router // Inject Router
  ) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe((data: Movie[]) => {
      this.movies = data;
    });
  }

  getStars(rating: number): number[] {
    return this.utilityService.getStars(rating);
  }

  addToWishlist(movie: Movie): void {
    movie.inWishlist = !movie.inWishlist;
    if (movie.inWishlist) {
      this.wishlistService.addToWishlist(movie);
    } else {
      this.wishlistService.removeFromWishlist(movie);
    }
  }

  isInWishlist(movie: Movie): boolean {
    return this.wishlistService.isInWishlist(movie);
  }

  buyNow(movie: Movie): void {
    const cartItem = {
      id: movie.id,
      name: movie.name,
      price: movie.price,
      quantity: 1, // Adjust as needed
      rating: movie.rating,
      imageUrl: movie.src
    };

    this.cartService.addToCart(cartItem); // Ensure this method exists in CartService
    this.router.navigate(['/checkout']); // Navigate to the checkout page
  }
}
