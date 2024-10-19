import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Adjust the path as needed

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../../shared_styles/login&register.scss']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  loading: boolean = false; // To indicate loading state
  errorMessage: string = ''; // To hold error messages

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    // Clear any previous error messages
    this.errorMessage = '';

    // Validate input fields
    if (!this.username || !this.password || !this.confirmPassword) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.loading = true; // Set loading to true while processing

    // Check if user already exists
    this.authService.isUserRegistered(this.username).subscribe(existingUsers => {
      if (existingUsers.length > 0) {
        this.loading = false; // Reset loading state
        this.errorMessage = 'User already registered. Please login.';
        return;
      }

      // Proceed with registration
      this.authService.register(this.username, this.password).subscribe(
        response => {
          this.loading = false; // Reset loading state
          console.log("Registration successful, redirecting to login...");
          // Registration successful, navigate to login page
          this.router.navigate(['/login']); // Ensure this is the correct route for login
        },
        error => {
          this.loading = false; // Reset loading state
          // Handle registration error
          this.errorMessage = 'Registration failed: ' + (error.error?.message || 'Please try again later.');
          console.error('Registration error:', error);
        }
      );
    });
  }
}
