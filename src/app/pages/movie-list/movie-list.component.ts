import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, signal, Signal } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model'; // Ensure correct import path
import { Router } from '@angular/router';
import { CartItem } from '../../models/cart-item.model'; // Import the CartItem interface
import { CartService } from '../../services/cart.service'; // Import CartService

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  providers: [MovieService]
})
export class MovieListComponent implements OnInit, AfterViewInit {

  movies:Movie[]=[];
// Initialize an empty array to store movies
  @ViewChild('container', { static: false }) container!: ElementRef;
  constructor(
    private movieService: MovieService,
    private router: Router,
    private cartService: CartService, // Inject CartService
  ) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(){
    this.movieService.getMovies().subscribe((data: Movie[]) => {
      this.movies = data;
    });
  }

  ngAfterViewInit(): void {}

  floorval(val: number): number {
    return Math.floor(val);
  }

  getStars(rating: number): number[] {
    const stars = [];
    for (let i = 1; i <= rating; i++) {
      stars.push(i);
    }
    return stars;
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
    this.router.navigate(['/cart']); // Navigate to the cart page
  }
  addToWishlist(id:number,prod :Movie){
    let payload={
 ...prod,
        isWishListed:!prod.isWishListed
    }
this.movieService.updateWishList(id,payload).subscribe(()=>{
  this.loadMovies();
});

  }

  }


