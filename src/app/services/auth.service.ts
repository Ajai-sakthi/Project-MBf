import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users'; // URL for your backend

  constructor(private http: HttpClient) {}

  // Method to log in the user
  login(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}&password=${password}`).pipe(
      map(users => {
        if (users.length > 0) {
          const user = users[0];
          localStorage.setItem('user', JSON.stringify(user));
          return { success: true, user }; // Return a success flag along with user
        } else {
          return { success: false, message: 'Invalid email or password' }; // Handle invalid credentials
        }
      }),
      catchError(err => {
        console.error('Login error:', err);
        return throwError(err); // Pass the error to the caller
      })
    );
  }

  // Method to register the user
  register(email: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { email, password }).pipe(
      map(response => {
        localStorage.setItem('user', JSON.stringify(response));
        this.sendConfirmationEmail(email); // Call to send the confirmation email
        return response; // Return the registration response
      }),
      catchError(err => {
        console.error('Registration error:', err);
        return throwError(err);
      })
    );
  }

  // Method to send registration confirmation email (mock implementation)
  private sendConfirmationEmail(email: string): void {
    console.log(`Confirmation email sent to ${email}`); // Simulating email sending
  }

  // Method to request a password reset
  forgotPassword(email: string): Observable<any> {
    return this.http.post('http://localhost:3000/forgot-password', { email }).pipe(
      map(response => {
        return { message: 'Password reset email has been sent successfully.' }; // Simulate successful response
      }),
      catchError(err => {
        console.error('Forgot password error:', err);
        return throwError({ message: 'Failed to send reset password email. Please try again.' });
      })
    );
  }

  // Method to reset password
  resetPassword(email: string, newPassword: string): Observable<any> {
    return this.http.patch<any[]>(`${this.apiUrl}?email=${email}`, { password: newPassword }).pipe(
      map(users => {
        if (users.length > 0) {
          console.log(`Password for ${email} has been reset`); // Simulating password reset
          return { success: true, user: users[0] }; // Return success flag and updated user
        } else {
          return { success: false, message: 'User not found' }; // Handle user not found
        }
      }),
      catchError(err => {
        console.error('Reset password error:', err);
        return throwError(err); // Pass the error to the caller
      })
    );
  }

  // Method to check if a user is already registered
  isUserRegistered(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}`).pipe(
      catchError(err => {
        console.error('Check registration error:', err);
        return throwError(err);
      })
    );
  }

  // Method to log out the user
  logout(): void {
    localStorage.removeItem('user');
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  // Get the current logged-in user data
  getCurrentUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
