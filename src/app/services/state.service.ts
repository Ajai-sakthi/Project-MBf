// src/app/services/state.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Movie } from '../models/movie.model'; // Adjust the import according to your project structure

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private movies: Movie[] = []; // Array to hold movies
  private ratingSource = new BehaviorSubject<string | number | null>(null); // To store the selected rating
  ratingChange = this.ratingSource.asObservable(); // Observable for components to subscribe to

  constructor() {
    // Initialize your movies here or fetch from an API
    this.movies = [];
  }

  // Method to get all movies
  getMovies(): Movie[] {
    return this.movies;
  }

  // Method to set the selected rating
  setRating(rating: string | number | null): void {
    this.ratingSource.next(rating); // Emit the new rating value
  }

  // Method to get the current rating
  getRating(): string | number | null {
    return this.ratingSource.value; // Return the current rating
  }
}
