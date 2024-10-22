import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;
  shippingCost: number = 0; // Property for shipping cost
  checkoutData = {
    name: '',
    address: '',
    paymentMethod: 'creditCard',
    phone: '',
    email: '',
    textAlerts: false // Boolean for opting in/out of text alerts
  };

  userId: number | null = null; // User ID which can be null
  private apiUrl = 'http://localhost:3000/users';

  constructor(
    private cartService: CartService,
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Calculate shipping cost based on total price
    this.shippingCost = this.calculateShippingCost();

    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.userId = currentUser.id;
      this.checkoutData.address = currentUser.address || ''; // Get saved address if available
      this.checkoutData.phone = currentUser.phone || ''; // Pre-fill saved phone if available
      this.checkoutData.email = currentUser.email || ''; // Pre-fill saved email if available
      this.checkoutData.textAlerts = currentUser.textAlerts || false; // Pre-fill saved text alerts preference
    }
  }

  // Method to calculate shipping cost (update logic as necessary)
  calculateShippingCost(): number {
    return this.totalPrice > 500 ? 0 : 50; // Example logic for shipping cost
  }

  // Method to open shipping information
  openShippingInfo(): void {
    // Logic to show shipping information can be implemented here.
    // For example, opening a modal or displaying additional text.
    alert('Shipping Information: Free shipping on orders over $500!');
  }

  onSubmit(): void {
    if (this.checkoutData.name && this.checkoutData.address) {
      // Process the order (e.g., send data to a server)
      console.log('Order placed:', this.checkoutData);

      // Update the user's details if userId is available
      if (this.userId !== null) {
        const updatedUser = {
          ...this.authService.getCurrentUser(),
          address: this.checkoutData.address,
          phone: this.checkoutData.phone,
          email: this.checkoutData.email,
          textAlerts: this.checkoutData.textAlerts
        };
        this.authService.updateUser(updatedUser).subscribe(
          response => {
            console.log('User updated successfully', response);
          },
          error => {
            console.error('Error updating user:', error);
          }
        );
      }

      this.cartService.clearCart(); // Clear the cart after placing the order
      this.router.navigate(['/payment']); // Navigate to confirmation page
    }
  }
  //navigate to payment
  navigateToPayment(): void {
    this.router.navigate(['/payment']);
  }

  // Save the user's address to db.json (if needed)
  saveAddress(userId: number, address: string): void {
    this.http.patch(`${this.apiUrl}/${userId}`, { address }).subscribe(() => {
      console.log('Address saved successfully');
    });
  }
}
