import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';
import { faStar, faFilm, faCalendar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-top-rated-movies',
  templateUrl: './top-rated-movies.component.html',
  styleUrls: ['./top-rated-movies.component.scss']
})
export class TopRatedMoviesComponent implements OnInit {
  allMovies: Movie[] = [];
  filteredMovies: Movie[] = [];
  selectedCondition: string = 'all'; // Default to 'all' condition

  // FontAwesome icons
  faStar = faStar;
  faFilm = faFilm;
  faCalendar = faCalendar;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.fetchMovies();
  }

  fetchMovies(): void {
    this.movieService.getTopRatedMovies(this.selectedCondition).subscribe((movies: Movie[]) => {
      this.filteredMovies = movies; // Update the filtered movies based on condition
    });

  }

 // Handle condition change
 onConditionChange(condition: string): void {
  this.selectedCondition = condition; // Update selected condition
  this.fetchMovies(); // Fetch movies based on new condition
}
}
