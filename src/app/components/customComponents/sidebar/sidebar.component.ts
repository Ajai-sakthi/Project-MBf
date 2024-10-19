// src/app/components/customComponents/sidebar/sidebar.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faHome, faSearch, faStar, faHeart, faLanguage } from '@fortawesome/free-solid-svg-icons';
import { StateService } from '../../../services/state.service'; // Adjust the path as necessary

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() isOpen: boolean = false; // Receive the sidebar state
  @Output() languageChange = new EventEmitter<string[]>(); // Emit language changes
  @Output() ratingChange = new EventEmitter<string | number | null>(); // Emit rating changes

  // Icon definitions
  faHome: IconDefinition = faHome;
  faSearch: IconDefinition = faSearch;
  faStar: IconDefinition = faStar;
  faHeart: IconDefinition = faHeart;
  faLanguage: IconDefinition = faLanguage; // Define faLanguage icon

  showRatingSelection = false; // Controls the rating dropdown
  showLanguageSelection = false; // Controls the language dropdown

  languages: string[] = ['Tamil', 'Malayalam', 'Hindi', 'English']; // Available languages
  selectedLanguages: string[] = []; // Currently selected languages

  // Ratings categories for 5, 4, and below 3 stars
  ratings = [
    { label: '5 Stars', value: 5 },
    { label: '4 Stars', value: 4 },
    { label: 'Below 3 Stars', value: 'below3' }
  ];

  selectedRatings: string | number | null = null; // Store selected rating

  constructor(private stateService: StateService) {}

  // Toggle language selection dropdown
  toggleLanguageSelection() {
    this.showLanguageSelection = !this.showLanguageSelection;
  }

  // Toggle rating selection dropdown
  toggleRatingSelection() {
    this.showRatingSelection = !this.showRatingSelection;
  }

  // Toggle individual language selection
  toggleLanguage(language: string) {
    const index = this.selectedLanguages.indexOf(language);
    if (index === -1) {
      this.selectedLanguages.push(language);
    } else {
      this.selectedLanguages.splice(index, 1);
    }
    this.languageChange.emit(this.selectedLanguages); // Emit selected languages
  }

  // Handle rating selection
  toggleRating(rating: number | string) {
    this.selectedRatings = this.selectedRatings === rating ? null : rating;
    this.ratingChange.emit(this.selectedRatings); // Emit selected rating
  }
}
