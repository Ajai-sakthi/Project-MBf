import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users'; // URL for the JSON server

  constructor(private http: HttpClient) {}

  // Method to log in the user
  login(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}&password=${password}`).pipe(
      map(users => {
        if (users.length > 0) {
          // Assuming the user exists, store user info in localStorage
          const user = users[0];
          localStorage.setItem('user', JSON.stringify(user)); // Store user in localStorage
          return user;
        } else {
          throw new Error('Invalid email or password');
        }
      }),
      catchError(err => {
        console.error('Login error:', err);
        return throwError(err);
      })
    );
  }

  // Method to register the user
  register(email: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { email, password }).pipe(
      map(response => {
        localStorage.setItem('user', JSON.stringify(response)); // Store the newly registered user in localStorage
        return response;
      }),
      catchError(err => {
        console.error('Registration error:', err);
        return throwError(err);
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
    localStorage.removeItem('user'); // Clear user session from localStorage
  }

  // This method checks if the user is logged in based on localStorage data
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user'); // Returns true if user exists in localStorage
  }

  // Method to get the current logged-in user data
  getCurrentUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
