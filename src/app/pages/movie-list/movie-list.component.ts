import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model'; // Ensure correct import path
import { Router } from '@angular/router';
 // Import the CartItem interface

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  providers: [MovieService]
})
export class MovieListComponent implements OnInit, AfterViewInit {
  movies: Movie[] = []; // Initialize an empty array to store movies

  @ViewChild('container', { static: false }) container!: ElementRef; 

  constructor(
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe((data: Movie[]) => {
      this.movies = data;
    });
  }

  ngAfterViewInit(): void {
  }

  floorval(val: number) {
    return Math.floor(val);
  }

  getStars(rating: number): number[] {
    const stars = [];
    for (let i = 1; i <= rating; i++) {
      stars.push(i);
    }
    return stars;
  }

  swipeRight() {
    if (this.container) {
      this.container.nativeElement.scrollBy({
        top: 0,
        left: 500, // Scroll by 300px to the right (adjust as needed)
        behavior: 'smooth' // Smooth scroll effect
      });
    }
  }
}
