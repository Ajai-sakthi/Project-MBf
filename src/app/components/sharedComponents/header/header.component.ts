import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchQuery: string = '';
  isProfileMenuOpen: boolean = false;
  isFilterMenuOpen: boolean = false;

  // Output event for sidebar toggle
  @Output() sidebarToggle: EventEmitter<void> = new EventEmitter();

  toggleSidebar() {
    this.sidebarToggle.emit(); // Emit event to parent to toggle sidebar
  }

  onSearch() {
    // Here you can handle the search functionality
    console.log("Search Query: ", this.searchQuery);
    // Add your search logic, such as filtering the movie list
  }

  openFilterMenu() {
    this.isFilterMenuOpen = !this.isFilterMenuOpen; // Toggle filter menu visibility
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen; // Toggle profile menu visibility
  }
   // Method to close the profile dropdown
   closeProfileMenu(): void {
    this.isProfileMenuOpen = false;
  }

  logout() {
    // Implement your logout logic here
    console.log("User logged out.");
    // Optionally redirect to login or home page
  }
}
