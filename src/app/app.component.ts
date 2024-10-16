import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'MBF';
  isOpen = false;// Sidebar is hidden by default

  onToggleSidebar() {
    this.isOpen = !this.isOpen; // Toggle the sidebar state
    console.log("Sidebar toggled:", this.isOpen); // Optional: Log to check if this function runs
  }
}
