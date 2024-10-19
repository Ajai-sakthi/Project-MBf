import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Movie } from '../models/movie.model'; // Adjust the path based on your project structure

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://localhost:3000/Movie'; // The URL of your JSON server
  private movies: Movie[] = [];

  private moviesSubject = new BehaviorSubject<Movie[]>(this.movies);
  movies$ = this.moviesSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Fetch all movies from the server
  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl);
  }

  // Fetch top rated movies
  getTopRatedMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl + '?_sort=rating&_order=desc&_limit=5'); // Adjust limit as needed
  }
  // Load movies into the local movies array and notify subscribers
  loadMovies(): void {
    this.getMovies().subscribe(movies => {
      this.movies = movies;
      this.moviesSubject.next(this.movies);
    });
  }

  // Get movies from the local array
  getMoviesFromLocal(): Movie[] {
    return this.movies;
  }

  // Get movies as an observable
  getMoviesObservable(): Observable<Movie[]> {
    return this.moviesSubject.asObservable();
  }

  // Add a movie to the wishlist
  addToWishlist(movie: Movie): void {
    const index = this.movies.findIndex(m => m.name === movie.name);
    if (index !== -1) {
      this.movies[index].inWishlist = true; // Make sure 'inWishlist' is a property in your Movie model
      this.moviesSubject.next(this.movies);
    }
  }

  // Remove a movie from the wishlist
  removeFromWishlist(movie: Movie): void {
    const index = this.movies.findIndex(m => m.name === movie.name);
    if (index !== -1) {
      this.movies[index].inWishlist = false; // Make sure 'inWishlist' is a property in your Movie model
      this.moviesSubject.next(this.movies);
    }
  }
}
