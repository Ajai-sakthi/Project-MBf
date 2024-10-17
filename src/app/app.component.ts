import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'MBF';
  isSidebarOpen: boolean = false;

  onSidebarToggle() {
    this.isSidebarOpen = !this.isSidebarOpen; // Toggle the sidebar open/close state
  }
}
