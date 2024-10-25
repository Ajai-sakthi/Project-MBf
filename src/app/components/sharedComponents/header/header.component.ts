import { Component, EventEmitter, Output, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MovieService } from '../../../services/movie.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private movieService = inject(MovieService);
  searchQuery = new FormControl('');
  isProfileMenuOpen: boolean = false;
  isFilterMenuOpen: boolean = false;
  showSearchAndFilter: boolean = false;

  // New properties
  showSearchResults: boolean = false;
  filteredMovies: any[] = []; // Replace with your movie type
  cartCount: number = 0;

  // Filter properties
  selectedRating: string = ''; // Keep as string for options
  selectedLanguage: string = '';

  // Filter options
  ratingOptions: string[] = ['below 3', '4', '5'];
  languageOptions = [
    { name: 'English', code: 'Hollywood' },
    { name: 'Tamil', code: 'Kollywood' },
    { name: 'Hindi', code: 'Bollywood' },
    { name: 'Malayalam', code: 'Mollywood' }
  ];

  // Output event for sidebar toggle
  @Output() sidebarToggle: EventEmitter<void> = new EventEmitter();

  constructor(
    private authService: AuthService,
    public router: Router,
    private cartService: CartService
  ) {
    // Subscribe to cart count
    this.cartService.cartCountSubject.subscribe(count => {
      this.cartCount = count; // Update cart count from the service
    });
  }

  ngOnInit() {
    // Subscribe to router events to toggle search and filter visibility based on route
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd)) // Filter only NavigationEnd events
      .subscribe((event: NavigationEnd) => {
        // Show search and filter only on the /movies page
        this.showSearchAndFilter = event.url === '/movies';
      });
  }

  toggleSidebar(): void {
    this.sidebarToggle.emit(); // Emit event to parent to toggle sidebar
  }

  onSearch(query: string | null): void {
    if (query) {
      const filters = {
        rating: this.selectedRating,      // Use selected rating
        languageOptions: this.selectedLanguage, // Use selected language
        query: query.trim() // Trim the search query
      };
      this.filterMovies(filters); // Pass the filters object
      this.showSearchResults = this.filteredMovies.length > 0; // Show results if there are any
    }
  }

  ngAfterViewInit() {
    this.searchQuery.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((query: any) => {
      this.onSearch(query); // Pass query directly
    });
  }

  onSearchEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.showSearchResults = false; // Hide search results after pressing Enter
    }
  }

  openFilterMenu(): void {
    this.isFilterMenuOpen = !this.isFilterMenuOpen; // Toggle filter menu visibility
  }

  applyFilters(): void {
    const filters = {
      rating: this.selectedRating,
      languageOptions: this.selectedLanguage,
    };

    // Send filter data to the service
    console.log('applying filters', filters);
    this.filterMovies(filters); // Call filterMovies with selected filters
  }

  closeSearchResults(): void {
    this.showSearchResults = false; // Hide search results
  }

  toggleProfileMenu(): void {
    this.isProfileMenuOpen = !this.isProfileMenuOpen; // Toggle profile menu visibility
  }

  logout(): void {
    this.authService.logout(); // Clear user session from the AuthService
    this.router.navigate(['/login']); // Redirect to login page
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // Updated filterMovies function
  filterMovies(filters: { rating?: string; languageOptions?: string; query?: string | null }) {
    this.movieService.getMovies().subscribe((res: any) => {
      res = res.filter((data: any) => {
        // Initialize conditions
        const matchesRating = filters.rating
                ? (filters.rating === 'below 3' ? data.rating < 3
                  : filters.rating === '4' ? (data.rating >= 4 && data.rating < 5)
                  : filters.rating === '5' ? data.rating >= 5
                  : true)
                : true;

        const matchesLanguage = filters.languageOptions ?
          data.language.toLowerCase() === filters.languageOptions.toLowerCase() : true;
        const matchesQuery = filters.query ?
          data.name.toLowerCase().includes(filters.query.toLowerCase()) : true;

        // Return true if all conditions are met (AND filter)
        return matchesRating && matchesLanguage && matchesQuery;
      });

      // Update the currentMovies observable with the filtered result
      this.movieService.currentMovies.set(res);
    });
  }
  isOnLoginOrRegisterPage(): boolean {
    return this.router.url === '/login' || this.router.url === '/register';
  }
}

