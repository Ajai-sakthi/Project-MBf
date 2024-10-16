import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Adjust the path as needed

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    this.authService.register(this.username, this.password).subscribe(
      response => {
        // Handle successful registration, e.g., navigate to login
        alert('Registration successful! Please log in.');
        this.router.navigate(['/login']);
      },
      error => {
        // Handle registration error
        alert('Registration failed: ' + error.message);
      }
    );
  }
}
