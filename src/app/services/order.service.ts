import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'https://your-backend-api-url.com/orders'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  // Place an order
  placeOrder(order: Order): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, order, { headers })
      .pipe(
        catchError(error => {
          console.error('Order placement failed', error);
          throw error;
        })
      );
  }

  // Optionally, you can add other order-related methods, such as:
  // - Get order history
  // - Cancel an order
  // - Get order details by ID
}
