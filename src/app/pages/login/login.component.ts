import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Adjust the path as needed

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../shared_styles/login&register.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loading: boolean = false; // To indicate loading state
  errorMessage: string = ''; // To hold error messages

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    // Clear any previous error messages
    this.errorMessage = '';

    // Validate input fields
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter both email and password.';
      return;
    }

    this.loading = true; // Set loading to true while processing

    this.authService.login(this.username, this.password).subscribe(
      response => {
        this.loading = false; // Reset loading state
        // Check if user exists
        if (response.length > 0) {
          // User is logged in successfully, navigate to movie list
          this.router.navigate(['/movies']); // Adjust the route as needed
        } else {
          this.errorMessage = 'Invalid credentials. Please try again.';
        }
      },
      error => {
        this.loading = false; // Reset loading state
        // Handle login error
        this.errorMessage = 'Login failed: ' + (error.error?.message || 'Please try again later.');
        console.error('Login error:', error);
      }
    );
  }
}
