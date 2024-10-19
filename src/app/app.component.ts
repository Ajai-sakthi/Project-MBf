import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Movie } from './models/movie.model'; // Assuming you have a Movie model
import { MovieService } from './services/movie.service'; // Service to fetch movies
import { filter } from 'rxjs/operators'; // Import filter for RxJS

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MBF';
  isSidebarOpen: boolean = false;
  isLoginPage: boolean = false;

  selectedRating: string | number | null = null;
  selectedLanguages: string[] = [];
  movies: Movie[] = []; // Store all movies
  filteredMovies: Movie[] = []; // Store filtered movies
  isLoginOrRegisterPage: boolean = false; // Track if on login/register page

  constructor(private router: Router, private movieService: MovieService) {
    // Fetch movies initially
    this.movieService.getMovies().subscribe(data => {
      this.movies = data;
      this.filteredMovies = data; // Initialize with all movies
    });

    // Subscribe to router events to track navigation
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isLoginOrRegisterPage = this.isLoginOrRegister();
    });
  }

  // Check if the current route is login or register
  isLoginOrRegister(): boolean {
    const currentRoute = this.router.url;
    return currentRoute === '/login' || currentRoute === '/register';
  }

  onSidebarToggle() {
    this.isSidebarOpen = !this.isSidebarOpen; // Toggle the sidebar open/close state
  }

  onLanguageChange(selectedLanguages: string[]) {
    this.selectedLanguages = selectedLanguages;
    this.filterMovies(); // Apply filtering after language change
  }

  onRatingChange(selectedRating: string | number | null) {
    this.selectedRating = selectedRating;
    // Navigate to the top-rated movies page, or set it in a service to be accessed later
    if (this.router.url === '/top-rated-movies') {
      // If already on the top-rated movies page, filter there
      this.router.navigate(['/top-rated-movies']);
    }
  }

  // Filter movies based on selected ratings and languages
  filterMovies() {
    this.filteredMovies = this.movies.filter(movie => {
      const matchesRating = this.selectedRating ? (movie.rating === this.selectedRating) : true;
      const matchesLanguage = this.selectedLanguages.length ? this.selectedLanguages.includes(movie.language) : true; // Adjust this according to your movie model
      return matchesRating && matchesLanguage;
    });
  }
}
