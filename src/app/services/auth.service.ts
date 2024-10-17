import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';

  // Add a user property to store user data
  private user: any;

  constructor(private http: HttpClient) {}

  // Simulating a login request to the server
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password });
  }

  // Simulating a registration request to the server
  register(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { username, password });
  }

  // Save user data after login
  setUser(user: any) {
    this.user = user;
  }

  // Method to return the user data
  getUser() {
    return this.user;
  }
}
