import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';  // Your JSON Server endpoint

  constructor(private http: HttpClient) {}

  // Register a new user
  register(email: string, password: string): Observable<any> {
    return this.isUserRegistered(email).pipe(
      map((existingUsers) => {
        if (existingUsers.length > 0) {
          throw new Error('User already registered');
        } else {
          // Post new user to the JSON Server
          return this.http.post(this.apiUrl, { email, password }).subscribe(
            (response) => console.log('User registered successfully', response),
            (error) => console.error('Error registering user', error)
          );
        }
      }),
      catchError((error) => {
        console.error('Error during registration', error);
        return of(null);  // Return null in case of error
      })
    );
  }

  // Check if user exists (used for registration)
  isUserRegistered(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}`).pipe(
      catchError((error) => {
        console.error('Error checking user registration', error);
        return of([]);  // Return an empty array in case of error
      })
    );
  }

  // User login
  login(email: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}&password=${password}`).pipe(
      map((users) => {
        if (users.length > 0) {
          localStorage.setItem('user', JSON.stringify(users[0]));
          return true;
        } else {
          return false;
        }
      }),
      catchError((error) => {
        console.error('Error during login', error);
        return of(false);  // Return false in case of error
      })
    );
  }

  // Logout the user
  logout(): void {
    localStorage.removeItem('user');  // Clear user session from local storage
  }

  // Check if a user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  // Get the current logged-in user
  getCurrentUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
