import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'MBF';
  isSidebarOpen = false; // Sidebar is hidden by default

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen; // Toggle the sidebar state
    console.log('Sidebar Open:', this.isSidebarOpen); // Check the value
  }
}
