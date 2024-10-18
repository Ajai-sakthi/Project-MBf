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
  faTrophy: IconDefinition = faTrophy;
  faStar: IconDefinition = faStar;
  faClock: IconDefinition = faClock;
  faDownload: IconDefinition = faDownload;
  faHeart: IconDefinition = faHeart;
  faPlus: IconDefinition = faPlus;
  faCheck: IconDefinition = faCheck;
  faCog: IconDefinition = faCog;
  faLanguage: IconDefinition = faLanguage; // Define faLanguage icon
  faSignOutAlt: IconDefinition = faSignOutAlt;

  // Language selection properties
  showLanguageSelection: boolean = false;
  languages: string[] = ['Tamil', 'Malayalam', 'Hindi','English']; // Available languages
  selectedLanguages: string[] = []; // Currently selected languages

  // Toggle language selection dropdown
  toggleLanguageSelection() {
    this.showLanguageSelection = !this.showLanguageSelection;
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
}
