import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Adjust the path as needed

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../shared_styles/login&register.scss']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  loading: boolean = false; // To indicate loading state
  errorMessage: string = ''; // To hold error messages

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.checkLoggedInUser(); // Check for logged-in user on initialization
  }

  // Pre-fill the form with previously stored user credentials
  checkLoggedInUser() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (user && user.username) {
      this.username = user.username; // Pre-fill the username
      this.password = user.password; // Pre-fill the password
    }
  }

  // Handle the login form submission
  onSubmit(): void {
    this.errorMessage = ''; // Clear any previous error messages

    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter both email and password.'; // Validate input
      return;
    }

    this.loading = true; // Show loading state while processing

    // Call the login method of the AuthService
    this.authService.login(this.username, this.password).subscribe(
      response => {
        this.loading = false; // Reset loading state

        if (response.length > 0) {
          // User is authenticated successfully
          const userDetails = { username: this.username, password: this.password }; // Store credentials
          localStorage.setItem('user', JSON.stringify(userDetails)); // Save user credentials in local storage

          // Navigate to the movies page or desired route after successful login
          this.router.navigate(['/movies']); // Adjust the route as needed
        } else {
          this.errorMessage = 'Invalid credentials. Please try again.';
        }
      },
      error => {
        this.loading = false; // Reset loading state on error
        this.errorMessage = 'Login failed: ' + (error.error?.message || 'Please try again later.');
        console.error('Login error:', error);
      }
    );
  }

  // Optional: Method to clear stored credentials (e.g., during logout)
  clearStoredCredentials() {
    localStorage.removeItem('user'); // Clear user details from local storage
    this.username = ''; // Reset form fields
    this.password = '';
  }
}
