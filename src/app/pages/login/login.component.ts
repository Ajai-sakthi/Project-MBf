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
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.checkLoggedInUser();

  }

  checkLoggedInUser() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.username) {
      this.username = user.username;
      this.password = user.password;
  }
  }
  onSubmit(): void {
    this.errorMessage = '';

    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter both username and password.';
      return;
    }

    this.loading = true;

    this.authService.login(this.username, this.password).subscribe(
      response => {
        this.loading = false;
        if (response) {
          // Navigate to the home page upon successful login
          this.router.navigate(['/']); // Adjust the route based on your app's routing config
        } else {
          this.errorMessage = 'Invalid credentials. Please try again.';
        }
      },
      error => {
        this.loading = false;
        this.errorMessage = 'Login failed: ' + (error.error?.message || 'Please try again later.');
        console.error('Login error:', error);
      }
    );
  }

  clearStoredCredentials() {
    localStorage.removeItem('user');
    this.username = '';
    this.password = '';
  }
}
