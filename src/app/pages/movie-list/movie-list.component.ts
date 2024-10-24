import { Component, ElementRef, OnInit, ViewChild,computed ,AfterViewInit} from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model'; // Ensure correct import path
import { Router } from '@angular/router';
import { CartItem } from '../../models/cart-item.model'; // Import the CartItem interface
import { CartService } from '../../services/cart.service'; // Import CartService
import { UtilityService } from '../../services/utility.service';
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit, AfterViewInit {
 isFirstTime = true;
  movies = computed(()=>this.movieService.currentMovies())
  filteredMovies: Movie[] = [];
  searchQuery: string = '';

// Initialize an empty array to store movies
  @ViewChild('container', { static: false }) container!: ElementRef;
  constructor(
    private movieService: MovieService,
    private router: Router,
    private cartService: CartService,
    private utilityService:UtilityService
  ) {}

  ngOnInit(): void {
    this.loadMovies();
    // Subscribe to filter changes and set initial filteredMovies
    this.movieService.getMovies().subscribe(movies => {
      this.filteredMovies = movies; // Set all movies to filteredMovies initially
    });

    this.movieService.getFilters().subscribe(filters => {
      if (filters) {
        this.applyFilters(filters);
      }
    });

  }
  loadMovies(): void {
    this.movieService.getMovies().subscribe((data: Movie[]) => {
      if (this.isFirstTime) {
        console.log('Movies loaded from API:', data);
        this.movieService.currentMovies.set(data);
        this.isFirstTime = false;
      }
    });
  }
  ngAfterViewInit(): void {}

  floorval(val: number): number {
    return this.utilityService.floorval(val);
  }
  getStars(rating: number):number[]{
   return this.utilityService.getStars(rating);
  }
  addToCart(movie: Movie): void {
    const cartItem: CartItem = {
      id: movie.id,
      name: movie.name,
      price: movie.price.toString().replace(/,/g, ''), // Convert to string here
      quantity: 1, // Set initial quantity
      rating: movie.rating,
      imageUrl: movie.src,
      src: movie.src, // Ensure src is included if needed
      movie: movie // Include the movie object here
    }
    this.cartService.addToCart(cartItem); // Call the addToCart method from CartService
    alert(`${movie.name} has been added to your cart!`); // Show a confirmation message
   // this.router.navigate(['/cart']); // Navigate to the cart page
  }
  updateWishlist(id:number,prod :Movie){
    prod.isWishListed=!prod.isWishListed;
      let payload={
      ...prod,
             isWishListed:prod.isWishListed
         }
         this.movieService.updateWishList(id,payload).subscribe(()=>{
             this.loadMovies();
           });
    }
    applyFilters(filters: any): void {
      let movies = this.movies(); // Get the current movies from the signal
      console.log('Movies before applying filters:', movies);

      // Filter by search query
      if (this.searchQuery) {
        movies = movies.filter((movie: any) => movie.name.toLowerCase().includes(this.searchQuery.toLowerCase()));

      }

      // Apply rating filter
      if (filters.selectedRating) {
        const minRating = parseInt(filters.selectedRating, 10);
        movies = movies.filter((movie:any) => movie.rating >= minRating);
      }

      // Apply language filter
      if (filters.selectedLanguage) {
        movies = movies.filter((movie:any) => movie.language === filters.selectedLanguage);
      }

      console.log('Movies after applying filters:', movies);
      this.filteredMovies = movies; // Update the filtered movies
    }

    updateSearch(query: string): void {
      this.searchQuery = query; // Update the search query
      this.applyFilters(this.movieService.getCurrentFilters()); // Reapply filters with the current filters
    }

  }


