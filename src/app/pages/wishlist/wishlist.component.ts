import { Component, OnInit } from '@angular/core';
import { CartService } from './../../services/cart.service';
import { Movie } from './../../models/movie.model';
import { UtilityService } from './../../services/utility.service'; // Import UtilityService for getStars
import { Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  wishlistMovies: Movie[] = [];
  movies: Movie[] = [];
  constructor(
    private utilityService: UtilityService, // Inject UtilityService
    private router: Router, // Inject Router
    private movieService: MovieService,
    private cartService:CartService
  ) {}

  ngOnInit(): void {
    this.loadMovies();
  }
  getStars(rating: number): number[] {
    return this.utilityService.getStars(rating); // Call getStars method from UtilityService
  }
  floorval(val: number): number {
    return this.utilityService.floorval(val);
  }
  loadMovies() {
    this.movieService.getMovies().subscribe((data: Movie[]) => {
      this.movies = data;    
    });
  }
  removeFromWishlist(id: number, movie: Movie) {
    movie.isWishListed = !movie.isWishListed;
    let payload = {
      ...movie,
      isWishListed: movie.isWishListed,
    };
    this.movieService.updateWishList(id, payload).subscribe();
  }
  addToCart(movie:Movie){
    this.cartService.updateCart(movie,true).subscribe();}
}
