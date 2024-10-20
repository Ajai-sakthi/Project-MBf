import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MBF';
  isSidebarOpen: boolean = false;
  isLoginPage: boolean = false;

  constructor(private router: Router) {
    // Subscribe to router events to detect route changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Check if the current URL is '/login' or '/register'
        const currentUrl = this.router.url;
        this.isLoginPage = (currentUrl === '/login' || currentUrl === '/register');
      }
    });
  }

  onSidebarToggle() {
    this.isSidebarOpen = !this.isSidebarOpen; // Toggle the sidebar open/close state
  }
}
