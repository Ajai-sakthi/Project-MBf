import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient to make API calls
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchQuery: string = '';
  searchResults: any[] = []; // To hold the search results
  searchControl = new FormControl(); // Using reactive forms for debounce

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Subscribing to search input changes with debounce
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300), // Wait 300ms after the user stops typing
        distinctUntilChanged(), // Only trigger if the value changed
        switchMap(query => this.performSearch(query)) // Perform the search
      )
      .subscribe(results => {
        this.searchResults = results; // Update the search results
      });
  }

  // Perform the API search
  performSearch(query: string) {
    const apiUrl = `http://localhost:3000/movie?q=${query}`; // Adjust URL based on your db.json structure
    return this.http.get<any[]>(apiUrl); // Making the GET request
  }
}
