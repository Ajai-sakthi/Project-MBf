import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-root',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  providers:[MovieService]
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = []; // Initialize an empty array to store movies

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    // Fetch movies when the component is initialized
    this.movieService.getMovies().subscribe((data: Movie[]) => {
      this.movies = data;
    });
  }
  floorval(val: number){
    return Math.floor(val);
  }
  getStars(rating: number): number[] {
    const stars = [];
    for (let i = 1; i <= rating; i++) {
      stars.push(i);
    }
    return stars;
  }
  }

