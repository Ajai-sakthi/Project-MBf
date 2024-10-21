import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model'; // Ensure correct import path
import { Router } from '@angular/router';
import { CartItem } from '../../models/cart-item.model'; // Import the CartItem interface
import { CartService } from '../../services/cart.service'; // Import CartService
import { WishlistService } from '../../services/wishlist.service'; // Import WishlistService

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  providers: [MovieService]
})
export class MovieListComponent implements OnInit, AfterViewInit {
  movies: Movie[] = []; // Initialize an empty array to store movies

  @ViewChild('container', { static: false }) container!: ElementRef;

  constructor(
    private movieService: MovieService,
    private router: Router,
    private cartService: CartService, // Inject CartService
    private wishlistService: WishlistService // Inject WishlistService
  ) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe((data: Movie[]) => {
      this.movies = data;
    });
  }

  ngAfterViewInit(): void {}

  floorval(val: number): number {
    return Math.floor(val);
  }

  getStars(rating: number): number[] {
    const stars = [];
    for (let i = 1; i <= rating; i++) {
      stars.push(i);
    }
    return stars;
  }

  viewMoreInfo(movie: Movie): void {
    console.log('More info about:', movie);
    // Navigate to a detailed view or open a modal if needed
    // this.router.navigate(['/movie-details', movie.id]);
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

    this.cartService.addToCart(cartItem); // Call the addToCart method from CartService
    alert(`${movie.name} has been added to your cart!`); // Show a confirmation message
    this.router.navigate(['/cart']); // Navigate to the cart page
  }

  toggleWishlist(movie: Movie): void {
    if (this.wishlistService.isInWishlist(movie)) {
      this.wishlistService.removeFromWishlist(movie);
      alert(`${movie.name} has been removed from your wishlist!`); // Show removal confirmation
    } else {
      this.wishlistService.addToWishlist(movie);
      alert(`${movie.name} has been added to your wishlist!`); // Show addition confirmation
    }
  }

  isInWishlist(movie: Movie): boolean {
    return this.wishlistService.isInWishlist(movie);
  }

  swipeRight(): void {
    if (this.container) {
      this.container.nativeElement.scrollBy({
        top: 0,
        left: 500, // Scroll by 500px to the right (adjust as needed)
        behavior: 'smooth' // Smooth scroll effect
      });
    }
  }
}
