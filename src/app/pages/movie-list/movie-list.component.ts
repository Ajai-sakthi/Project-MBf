import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, signal, Signal, computed, inject } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model'; // Ensure correct import path
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service'; // Import CartService
import { UtilityService } from '../../services/utility.service';
@Component({
  selector: 'app-movie-list',
  templateUrl:'./movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit, AfterViewInit {
 isFirstTime = true;
  movies = computed(()=>this.movieService.currentMovies());
  wishListedMovies:[]=[];
// Initialize an empty array to store movies
  @ViewChild('container', { static: false }) container!: ElementRef;
  constructor(
    private movieService: MovieService,
    private router: Router,
    private cartService: CartService,
    private utilityService:UtilityService
  ) {}

ngOnInit(): void {
    this.loadMovies();}
  loadMovies(){
    this.movieService.getMovies().subscribe((data: Movie[]) => {
        this.movieService.currentMovies.set(data);  
    });}
  ngAfterViewInit(): void {}

  floorval(val: number): number {
    return this.utilityService.floorval(val);
  }
  getStars(rating: number):number[]{
   return this.utilityService.getStars(rating);
  }
addToCart(movie:Movie){
this.cartService.updateCart(movie,true).subscribe();}

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
  }


