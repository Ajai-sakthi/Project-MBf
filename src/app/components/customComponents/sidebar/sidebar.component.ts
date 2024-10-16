import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faHome, faSearch, faTrophy, faStar, faClock, faDownload, faHeart, faPlus, faCheck, faCog, faSignOutAlt, faLanguage } from '@fortawesome/free-solid-svg-icons'; // Importing faLanguage icon

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() isOpen: boolean = false; // Receive the sidebar state

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
}
