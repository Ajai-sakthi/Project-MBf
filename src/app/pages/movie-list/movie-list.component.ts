import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, computed } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';
import { Router } from '@angular/router';
import { CartItem } from '../../models/cart-item.model';
import { CartService } from '../../services/cart.service';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit, AfterViewInit {
  isFirstTime = true;
  movies = computed(() => this.movieService.currentMovies());
  filteredMovies: Movie[] = [];
  searchQuery: string = '';

  @ViewChild('container', { static: false }) container!: ElementRef;

  constructor(
    private movieService: MovieService,
    private router: Router,
    private cartService: CartService,
    private utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.loadMovies();

    this.movieService.getMovies().subscribe(movies => {
      this.filteredMovies = movies;
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
        this.movieService.currentMovies.set(data);
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

  addToCart(movie: Movie): void {
    const cartItem: CartItem = {
      id: movie.id,
      name: movie.name,
      price: movie.price.toString().replace(/,/g, ''),
      quantity: 1,
      rating: movie.rating,
      imageUrl: movie.src,
      src: movie.src,
      movie: movie
    };
    this.cartService.addToCart(cartItem);
    alert(`${movie.name} has been added to your cart!`);
  }

  updateWishlist(id: number, prod: Movie): void {
    prod.isWishListed = !prod.isWishListed;
    const payload = { ...prod, isWishListed: prod.isWishListed };
    this.movieService.updateWishList(id, payload).subscribe(() => {
      this.loadMovies();
    });
  }

  applyFilters(filters: any): void {
    let movies = this.movies();
    if (this.searchQuery) {
      movies = movies.filter(movie => movie.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }

    if (filters.selectedRating) {
      const minRating = parseInt(filters.selectedRating, 10);
      movies = movies.filter(movie => movie.rating >= minRating);
    }

    if (filters.selectedLanguage) {
      movies = movies.filter(movie => movie.language === filters.selectedLanguage);
    }

    this.filteredMovies = movies;
  }

  updateSearch(query: string): void {
    this.searchQuery = query;
    this.applyFilters(this.movieService.getCurrentFilters());
  }
}
