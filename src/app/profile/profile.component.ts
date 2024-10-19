import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Ensure the path to AuthService is correct

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  email: string | null = '';

  constructor(private authService: AuthService, private router: Router) {
    // Fetch the logged-in user's information from localStorage
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    this.email = user?.email || null;
  }

  // Method to handle logout
  logout(): void {
    this.authService.logout(); // Call the logout method from AuthService
    localStorage.removeItem('loggedInUser'); // Clear user data from localStorage
    this.router.navigate(['/']); // Navigate to the home page after logout
  }
}
