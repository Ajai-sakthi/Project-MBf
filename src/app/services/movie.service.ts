import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Movie } from '../models/movie.model'; // Adjust the path based on your project structure

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  wishListedMovies:[]=[]
  public wishListCount = new BehaviorSubject<number>(0);
  private apiUrl = 'http://localhost:3000/Movie'; // The URL of your JSON server
  currentMovies = signal<any>({});
constructor(private http: HttpClient) {
  this.loadWishlist();
}
// Fetch all movies from the server
  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl);
  }
    updateWishList(id: number, updatedData: Movie): Observable<Movie> {
    const url = `${this.apiUrl}/${id}`; // Use the movie's id to create the correct URL
    return this.http.put<Movie>(url, updatedData).pipe(
      tap(() => this.loadWishlist())
    );
  }
  getWishlistCount(): Observable<number> {
    return this.wishListCount.asObservable();
  }
  loadWishlist():any{
    this.getMovies().subscribe((data:any)=>{
      this.wishListedMovies = data.filter((movies: { isWishListed: boolean; }):any => movies.isWishListed === true);
    this.wishListCount.next(this.wishListedMovies.length);

    });
  }
}