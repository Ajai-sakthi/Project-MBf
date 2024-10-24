import { Component, EventEmitter, Output, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { debounce, debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
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
  selectedRating: string = '';
  selectedGenre: string = '';
  selectedLanguage: string = '';
  isTopRated: boolean = false;

  // Filter options
  ratingOptions: string[] = ['below 3', '4', '5'];
  genreOptions: string[] = ['Action', 'Drama', 'Comedy', 'Horror'];
  languageOptions: string[] = ['English', 'Tamil', 'Hindi', 'Malayalam'];

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

  onSearch(Query:string): void {
     
    this.filterMovies(Query);// Filter movies based on search query
    this.showSearchResults = this.filteredMovies.length > 0; // Show results if there are any
  }
  ngAfterViewInit(){
    this.searchQuery.valueChanges.pipe(debounceTime(300),distinctUntilChanged()).subscribe((qurey:any)=>{
        this.onSearch(qurey.trim());
    })
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
     console.log('Applying Filters: ', {
      selectedRating: this.selectedRating,
      selectedGenre: this.selectedGenre,
      selectedLanguage: this.selectedLanguage,
      isTopRated: this.isTopRated,
    });
    // Implement your actual filtering logic here
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

  // Example movie filtering function (replace with actual implementation)
  filterMovies(query: string){
    this.movieService.getMovies().subscribe((res:any)=>{
      res=res.filter((data:any)=>{
      return data?.name?.toString()?.trim()?.replaceAll(' ','').toLowerCase()?.includes(query.toLowerCase());
    });
      this.movieService.currentMovies.set(res);
       
    });
  }
}
