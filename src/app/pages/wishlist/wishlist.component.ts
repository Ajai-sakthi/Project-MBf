import { Component, OnInit } from '@angular/core';
import { CartService } from './../../services/cart.service';
import { CartItem } from './../../models/cart-item.model';
import { Movie } from './../../models/movie.model';
import { UtilityService } from './../../services/utility.service'; // Import UtilityService for getStars
import { Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  wishlistMovies: Movie[] = [];
  movies:Movie[]=[];
  constructor(
    private cartService: CartService,
    private utilityService: UtilityService,// Inject UtilityService
    private router: Router,// Inject Router
private movieService:MovieService
  ) {}

  ngOnInit(): void {
    this.loadMovies()
  }
  addToCart(movie: Movie): void {
    const cartItem: CartItem = {
      id: movie.id, // Ensure this property exists in the Movie model
      name: movie.name,
      price: movie.price, // Keep this as a string
      quantity: 1, // Set initial quantity
      rating: movie.rating,
      src: movie.src, // Include the src property
      imageUrl: movie.src, // You can keep the same value for imageUrl if that's correct
      movie: movie // Include the entire movie object if needed
      
    };

    this.cartService.addToCart(cartItem); // Pass the CartItem
    //console.log(`${movie.name} added to cart!`);
    alert(`${movie.name} has been added to your cart!`);
    //this.router.navigate(['/cart']);
  }

  getStars(rating: number): number[] {
    return this.utilityService.getStars(rating); // Call getStars method from UtilityService
  }
  floorval(val: number): number {
    return this.utilityService.floorval(val);
  }
  buyNow(movie: Movie): void {
    this.addToCart(movie); // Add the movie to the cart first
    // Navigate to checkout if needed, similar to MovieListComponent
  }
  loadMovies(){
    this.movieService.getMovies().subscribe((data: Movie[]) => {
      this.movies = data;
    });
  }
  removeFromWishlist(id:number,movie:Movie){
    movie.isWishListed=!movie.isWishListed;
    let payload={
      ...movie,
             isWishListed:movie.isWishListed
         }
    this.movieService.updateWishList(id,payload).subscribe();
    // this.loadMovies();
  }
}
