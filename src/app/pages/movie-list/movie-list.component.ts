import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model'; // Ensure correct import path
import { WishlistService } from './../../services/wishlist.service';
import { UtilityService } from './../../services/utility.service';
import { CartService } from './../../services/cart.service';
import { Router } from '@angular/router';
import { CartItem } from './../../models/cart-item.model'; // Import the CartItem interface

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
    private cartService: CartService,
    private router: Router
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
    const cartItem: CartItem = {
      id: movie.id, // Ensure movie has an id property
      name: movie.name,
      price: movie.price.replace(/,/g, ''), // Make sure movie.price is a string
      quantity: 1, // Initial quantity
      rating: movie.rating,
      src: movie.src, // Include the src property
      imageUrl: movie.src, // You can use the same source for imageUrl if applicable
      movie: movie // Include the entire movie object
    };

    this.cartService.addToCart(cartItem); // Pass the CartItem
    this.router.navigate(['/checkout']); // Navigate to checkout
  }



  addToCart(movie: Movie): void {
    const cartItem: CartItem = {
      id: movie.id,
      name: movie.name,
      price: movie.price.toString().replace(/,/g, ''), // Convert to string here
      quantity: 1, // Set initial quantity
      rating: movie.rating,
      imageUrl: movie.src,
      src: movie.src, // Ensure src is included if needed
      movie: movie // Include the movie object here
    };

    this.cartService.addToCart(cartItem); // Call the addToCart method
    this.router.navigate(['/cart']);
  }
}
