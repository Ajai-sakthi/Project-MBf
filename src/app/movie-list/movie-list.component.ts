import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service'; // Ensure this path is correct
import { CartService } from '../services/cart.service'; // Ensure this path is correct
import { Movie } from '../models/movie.model'; // Adjust this path to your Movie model
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = []; // Use your Movie type

  constructor(
    private movieService: MovieService,
    private cartService: CartService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.fetchMovies();
  }

  fetchMovies(): void {
    this.movieService.getMovies().subscribe(
      (data: Movie[]) => {
        this.movies = data;
      },
      (error) => {
        console.error('Error fetching movies:', error);
      }
    );
  }

  addToCart(movie: Movie): void {
    this.cartService.addToCart(movie);
    alert(`${movie.title} added to cart!`); // You can customize this message
    this.router.navigate(['/cart']);
  }
}
