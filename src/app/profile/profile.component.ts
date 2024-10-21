import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any; // To hold the user data
  welcomeMessage: string = 'Welcome, Guest'; // Default message for guests
  lastLoggedIn: string | null = null; // To hold the last logged-in time

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.user = currentUser;
      this.welcomeMessage = `Welcome, ${this.user.email}`; // Display user's email

      // Get the last logged-in time if available
      this.lastLoggedIn = currentUser.lastLoggedIn || 'N/A';
    }
  }
}
