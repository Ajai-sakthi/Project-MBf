import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any; // To hold the user data
  welcomeMessage: string = 'Welcome, Guest'; // Default message for guests
  lastLoggedIn: string | null = null; // To hold the last logged-in time

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.user = currentUser;
      this.welcomeMessage = `Welcome, ${this.user.name}`; // Display user's name instead of email
      this.lastLoggedIn = currentUser.lastLoggedIn ? new Date(currentUser.lastLoggedIn).toLocaleString() : 'N/A';
    }
  }

  // Method to navigate to the edit profile page
  editProfile(): void {
    this.router.navigate(['/edit-profile']); // Adjust the route as necessary
  }
}
