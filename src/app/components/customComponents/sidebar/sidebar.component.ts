import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faHome, faSearch, faTrophy, faStar, faClock, faDownload, faHeart, faPlus, faCheck, faCog, faSignOutAlt, faLanguage } from '@fortawesome/free-solid-svg-icons'; // Importing faLanguage icon

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() isOpen: boolean = false; // Receive the sidebar state
  @Output() languageChange = new EventEmitter<string[]>(); // Emit language changes

  // Icon definitions
  faHome: IconDefinition = faHome;
  faSearch: IconDefinition = faSearch;

  faStar: IconDefinition = faStar;

  faHeart: IconDefinition = faHeart;

  faLanguage: IconDefinition = faLanguage; // Define faLanguage icon

  showRatingSelection = false; // Controls the rating dropdown
  showLanguageSelection: boolean = false; // Controls the language dropdown

  languages: string[] = ['Tamil', 'Malayalam', 'Hindi', 'English']; // Available languages
  selectedLanguages: string[] = []; // Currently selected languages

  // Ratings categories for 4, 5, and below 3 stars
  ratings = [
    { label: '5 Stars', value: 5 },
    { label: '4 Stars', value: 4 },
    { label: 'Below 3 Stars', value: 'below3' }
  ];

  selectedRatings: string | number | null = null; // Store selected rating

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
    if (this.selectedRatings === rating) {
      this.selectedRatings = null; // Deselect if already selected
    } else {
      this.selectedRatings = rating; // Select the rating
    }
  }
}
