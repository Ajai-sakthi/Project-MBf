import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://localhost:3000/Movie';
  currentMovies = signal<Movie[]>([]);
  private filtersSubject = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl);
  }

  updateWishList(id: number, updatedData: Movie): Observable<Movie> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Movie>(url, updatedData);
  }

  setFilters(filters: any): void {
    this.filtersSubject.next(filters);
  }

  getFilters(): Observable<any> {
    return this.filtersSubject.asObservable();
  }

  getCurrentFilters(): any {
    return this.filtersSubject.getValue();
  }
}
