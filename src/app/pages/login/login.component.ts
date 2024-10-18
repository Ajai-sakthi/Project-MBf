import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Adjust the path as needed

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss','../../shared_styles/login&register.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        // Handle successful login, e.g., navigate to home or dashboard
        this.router.navigate(['/']); 
      },
      error => {
        // Handle login error
        alert('Login failed: ' + error.message);
      }
    );
  }
}
