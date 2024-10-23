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
constructor(private http: HttpClient) {}
// Fetch all movies from the server
  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl);
  }
    updateWishList(id: number, updatedData: Movie): Observable<Movie> {
    const url = `${this.apiUrl}/${id}`; // Use the movie's id to create the correct URL
    return this.http.put<Movie>(url, updatedData); // Use the movie object for the update
  }
}
