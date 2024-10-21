import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users'; // Mock backend API URL

  constructor(private http: HttpClient) {}

  // Method to log in the user
  login(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}&password=${password}`).pipe(
      map(users => {
        if (users.length > 0) {
          const user = users[0];
          localStorage.setItem('user', JSON.stringify(user)); // Save user to localStorage
          return { success: true, user }; // Return success response with user data
        } else {
          return { success: false, message: 'Invalid email or password' }; // Handle invalid credentials
        }
      }),
      catchError(err => {
        console.error('Login error:', err);
        return throwError(err); // Propagate error to the caller
      })
    );
  }

  // Method to register the user
  register(email: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { email, password }).pipe(
      map(response => {
        localStorage.setItem('user', JSON.stringify(response)); // Save registered user to localStorage
        this.sendConfirmationEmail(email); // Simulate sending a confirmation email
        return response; // Return registration response
      }),
      catchError(err => {
        console.error('Registration error:', err);
        return throwError(err); // Propagate error to the caller
      })
    );
  }

  // Mock method to send a registration confirmation email
  private sendConfirmationEmail(email: string): void {
    console.log(`Confirmation email sent to ${email}`); // Simulate sending an email
  }

  // Method to request a password reset
  forgotPassword(email: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}`).pipe(
      map(users => {
        if (users.length > 0) {
          return { message: 'Password reset email has been sent successfully.' }; // Simulate success
        } else {
          throw new Error('Email not found'); // Simulate email not found error
        }
      }),
      catchError(err => {
        console.error('Forgot password error:', err);
        return throwError({ message: 'Failed to send reset password email. Please try again.' });
      })
    );
  }


  // Method to reset password
  resetPassword(email: string, newPassword: string): Observable<any> {
    // Update password using PATCH to modify existing user data
    return this.http.patch<any[]>(`${this.apiUrl}?email=${email}`, { password: newPassword }).pipe(
      map(users => {
        if (users.length > 0) {
          console.log(`Password for ${email} has been reset`); // Log reset action
          return { success: true, user: users[0] }; // Return success response with updated user data
        } else {
          return { success: false, message: 'User not found' }; // Handle case where user is not found
        }
      }),
      catchError(err => {
        console.error('Reset password error:', err);
        return throwError(err); // Propagate error to the caller
      })
    );
  }

  // Method to check if a user is already registered by email
  isUserRegistered(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}`).pipe(
      catchError(err => {
        console.error('Check registration error:', err);
        return throwError(err); // Propagate error to the caller
      })
    );
  }

  // Method to log out the user
  logout(): void {
    localStorage.removeItem('user'); // Remove user data from localStorage
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user'); // Return true if user data is found in localStorage
  }

  // Get the current logged-in user data
  getCurrentUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null; // Parse user data if present in localStorage
  }
}
