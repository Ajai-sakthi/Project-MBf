import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users'; // URL for the JSON server

  constructor(private http: HttpClient) {}

  // Method to log in the user
  login(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}&password=${password}`).pipe(
      catchError(err => {
        console.error('Login error:', err);
        return throwError(err);
      })
    );
  }

  // Method to register the user
  register(email: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { email, password }).pipe(
      catchError(err => {
        console.error('Registration error:', err);
        return throwError(err);
      })
    );
  }

  // Method to check if a user is already registered
  isUserRegistered(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}`);
  }
}
