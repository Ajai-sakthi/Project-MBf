import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-root',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  providers: [MovieService]
})
export class MovieListComponent implements OnInit, AfterViewInit {
  movies: Movie[] = []; // Initialize an empty array to store movies

  @ViewChild('container', { static: false }) container!: ElementRef; 

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    // Fetch movies when the component is initialized
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
