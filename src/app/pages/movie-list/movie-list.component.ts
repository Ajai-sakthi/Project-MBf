import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model'; // Ensure correct import path
import { Router } from '@angular/router';
import { CartItem } from '../../models/cart-item.model';
import { CartService } from '../../services/cart.service';
 // Import the CartItem interface

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  providers: [MovieService,CartService]
})
export class MovieListComponent implements OnInit, AfterViewInit {
  movies: Movie[] = []; // Initialize an empty array to store movies
  @ViewChild('container', { static: false }) container!: ElementRef; 
  CartService: any;

  constructor(
    private movieService: MovieService,
    private router: Router,
   // private wishlistService: WishlistService,
   // private utilityService: UtilityService,
    private cartService: CartService,
   
  ) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe((data: Movie[]) => {
      this.movies = data;
    });
  }

  ngAfterViewInit(): void {
  }

  floorval(val: number) {
    return Math.floor(val);
  }

  getStars(rating: number): number[] {
    const stars = [];
    for (let i = 1; i <= rating; i++) {
      stars.push(i);
    }
    return stars;
  }

  viewMoreInfo(movie: any): void {
    // Logic to show more info about the movie, e.g., navigating to a detailed view or opening a modal
    console.log('More info about:', movie);
    // You might navigate to a detail page or open a modal
    // this.router.navigate(['/movie-details', movie.id]); // Example if you have a detailed view
  }

  addToCart(movie: Movie): void {
    console.log("hello");
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

  swipeRight() {
    if (this.container) {
      this.container.nativeElement.scrollBy({
        top: 0,
        left: 500, // Scroll by 300px to the right (adjust as needed)
        behavior: 'smooth' // Smooth scroll effect
      });
    }
  }
}