import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, signal, Signal, computed, inject } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model'; // Ensure correct import path
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service'; // Import CartService
import { UtilityService } from '../../services/utility.service';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-movie-list',
  templateUrl:'./movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit, AfterViewInit {
  isFirstTime = true;
  movies = computed(() => this.movieService.currentMovies()); // Use currentMovies signal for movie data
  filteredMovies: Movie[] = [];
  isFilterVisible: boolean = false;
  searchQuery: string = ''; // Search query for filtering
  wishListedMovies:[]=[];

  @ViewChild('container', { static: false }) container!: ElementRef;

  constructor(
    private movieService: MovieService,
    private router: Router,
    private cartService: CartService,
    private utilityService: UtilityService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.loadMovies();
// Subscribe to changes in filter options and apply them to filteredMovies
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
        this.movieService.currentMovies.set(data); // Store the loaded movies in the signal
        this.isFirstTime = false;
      }
    });
  }

  ngAfterViewInit(): void {}

  floorval(val: number): number {
    return this.utilityService.floorval(val);
  }

  getStars(rating: number): number[] {
    return this.utilityService.getStars(rating);
  }
addToCart(movie:Movie){
this.cartService.updateCart(movie,true).subscribe();}

updateWishlist(id:number,prod :Movie){
    prod.isWishListed=!prod.isWishListed;
      let payload={
      ...prod,
      isWishListed: prod.isWishListed
    };
    this.movieService.updateWishList(id, payload).subscribe(() => {
      this.loadMovies(); // Reload movies after wishlist update
    });
  }

  applyFilters(filters: any): void {
    let movies = this.movies(); // Get current movie list from the signal
    console.log('Movies before applying filters:', movies);
    console.log('filters applied',filters)

    // Apply search query filter
    if (this.searchQuery.trim()) {
      movies = movies.filter((movie: Movie) =>
        movie.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    // Apply rating filter
    if (filters.selectedRating) {
      const minRating = parseInt(filters.selectedRating, 10);
      movies = movies.filter((movie: Movie) => movie.rating >= minRating);
    }

    // Apply language filter
    if (filters.selectedLanguage) {
      movies = movies.filter((movie: Movie) => movie.language === filters.selectedLanguage);
    }
    this.filteredMovies = [...movies]; // Update filtered movies
    console.log('Movies after applying filters:', movies);
    this.cdr.detectChanges();
    
  }

  updateSearch(query: string): void {
    this.searchQuery = query; // Update search query
    this.applyFilters(this.movieService.getCurrentFilters()); // Apply current filters with updated search query
  }
  toggleFilters(): void {
    this.isFilterVisible = !this.isFilterVisible; // Toggle filter visibility
  }
}