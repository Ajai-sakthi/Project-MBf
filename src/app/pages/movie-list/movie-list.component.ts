import { CartItem } from './../../models/cart-item.model';
import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { CartService } from '../../services/cart.service';
import { Movie } from '../../models/movie.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = []; // List of movies
  isLoading: boolean = true; // Loading state

  constructor(
    private movieService: MovieService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchMovies(); // Fetch the movie data on component initialization
  }

  // Fetch movies from the service
  fetchMovies(): void {
    this.movieService.getMovies().subscribe(
      (data: Movie[]) => {
        this.movies = data; // Assign the fetched movies to the movies array
        this.isLoading = false; // Stop loading once the movies are fetched
      },
      (error) => {
        console.error('Error fetching movies:', error); // Handle error
        this.isLoading = false; // Stop loading if there's an error
      }
    );
  }

  // Add a movie to the cart
  addToCart(movie: Movie): void {
    const CartItem:CartItem={
      ...movie,
      quantity:1
    }
    this.cartService.addToCart(CartItem);
    alert(`${movie.title} has been added to your cart!`);
    this.router.navigate(['/cart']); // Navigate to the cart page after adding
  }

  // TrackBy function for efficient rendering of movie list
  trackByMovieId(index: number, movie: Movie): number {
    return movie.id; // Ensure Movie model has an id field
  }
}
