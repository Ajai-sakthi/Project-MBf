// src/app/pages/top-rated-movies/top-rated-movies.component.ts
import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie.model'; // Import your Movie model
import { StateService } from '../../services/state.service'; // Adjust the import as necessary

@Component({
  selector: 'app-top-rated-movies',
  templateUrl: './top-rated-movies.component.html',
  styleUrls: ['./top-rated-movies.component.scss']
})
export class TopRatedMoviesComponent implements OnInit {
  movies: Movie[] = []; // All movies list
  filteredMovies: Movie[] = []; // Filtered movie list
  selectedRating: string | number | null = null; // Currently selected rating

  constructor(private stateService: StateService) {}

  ngOnInit() {
    this.movies = this.stateService.getMovies(); // Fetch your movies from the service
    this.stateService.ratingChange.subscribe((rating: string | number | null) => {
      this.selectedRating = rating;
      this.filterMovies(); // Call the filter method whenever rating changes
    });
  }

  filterMovies() {
    if (this.selectedRating === 'below3') {
      this.filteredMovies = this.movies.filter(movie => movie.rating < 3);
    } else if (this.selectedRating) {
      this.filteredMovies = this.movies.filter(movie => movie.rating === this.selectedRating);
    } else {
      this.filteredMovies = this.movies; // If no rating is selected, show all movies
    }
  }
    // Method to return an array of stars for display
    getStars(rating: number): number[] {
      return new Array(Math.round(rating)); // Create an array with the number of stars
    }
}

