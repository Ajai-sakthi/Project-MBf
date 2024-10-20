import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchQuery: string = '';
  isProfileMenuOpen: boolean = false;
  isFilterMenuOpen: boolean = false;

  // New properties
  showSearchResults: boolean = false;
  filteredMovies: any[] = []; // Update with your movie type
  cartCount: number = 0;

  // Filter properties
  selectedRating: string = '';
  selectedGenre: string = '';
  selectedLanguage: string = '';
  isTopRated: boolean = false;

  // Filter options (replace these with your actual options)
  ratingOptions: string[] = ['below 3', '4', '5'];
  genreOptions: string[] = ['Action', 'Drama', 'Comedy', 'Horror'];
  languageOptions: string[] = ['English', 'Tamil', 'Hindi','Malayalam'];

  // Output event for sidebar toggle
  @Output() sidebarToggle: EventEmitter<void> = new EventEmitter();

  constructor(private authService: AuthService, public router: Router, private cartService: CartService) {
    // Subscribe to the cart count
    this.cartService.cartCountSubject.subscribe(count => {
      this.cartCount = count; // Update the cart count from the service
    });
  }

  toggleSidebar(): void {
    this.sidebarToggle.emit(); // Emit event to parent to toggle sidebar
  }

  onSearch(): void {
    console.log("Search Query: ", this.searchQuery);
    this.filteredMovies = this.filterMovies(this.searchQuery); // Implement this function to filter movies
    this.showSearchResults = this.filteredMovies.length > 0; // Show results if there are any
  }

  onSearchEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.showSearchResults = false; // Hide results after pressing Enter
      // Navigate to the selected movie or perform other actions
      console.log("Search Entered: ", this.searchQuery);
    }
  }

  openFilterMenu(): void {
    this.isFilterMenuOpen = !this.isFilterMenuOpen; // Toggle filter menu visibility
  }

  applyFilters(): void {
    console.log('Applying Filters: ', {
      selectedRating: this.selectedRating,
      selectedGenre: this.selectedGenre,
      selectedLanguage: this.selectedLanguage,
      isTopRated: this.isTopRated,
    });
    // Implement your filtering logic here
  }

  closeSearchResults(): void {
    this.showSearchResults = false; // Hide search results
  }

  toggleProfileMenu(): void {
    this.isProfileMenuOpen = !this.isProfileMenuOpen; // Toggle profile menu visibility
  }

  logout(): void {
    this.authService.logout(); // Clear user session from the AuthService
    this.router.navigate(['/login']); // Redirect to the login page
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // Example filtering function for demonstration (replace with your actual implementation)
  filterMovies(query: string): any[] {
    const allMovies = [
      { name: 'Movie 1' },
      { name: 'Movie 2' },
      { name: 'Top Movie' },
      // Add more movies
    ];

    return allMovies.filter(movie => movie.name.toLowerCase().includes(query.toLowerCase()));
  }
}
