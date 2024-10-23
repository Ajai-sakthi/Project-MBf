import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;
  shippingCost: number = 0; // Property for shipping cost
  checkoutForm: FormGroup; // Reactive form

  userId: number | null = null; // User ID which can be null
  private apiUrl = 'http://localhost:3000/users';

  constructor(
    private cartService: CartService,
    private router: Router,
    private authService: AuthService,
    private http: HttpClient,
    private fb: FormBuilder // FormBuilder for Reactive Forms
  ) {
    // Initialize the reactive form
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      paymentMethod: ['creditCard', Validators.required],
      textAlerts: [false]
    });
  }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Calculate shipping cost based on total price
    this.shippingCost = this.calculateShippingCost();

    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.userId = currentUser.id;

      // Populate the form with user's saved details
      this.checkoutForm.patchValue({
        address: currentUser.address || '',
        phone: currentUser.phone || '',
        email: currentUser.email || '',
        textAlerts: currentUser.textAlerts || false
      });
    }
  }

  // Method to calculate shipping cost (update logic as necessary)
  calculateShippingCost(): number {
    return this.totalPrice > 500 ? 0 : 50; // Example logic for shipping cost
  }

  // Method to open shipping information
  openShippingInfo(): void {
    // Logic to show shipping information can be implemented here.
    alert('Shipping Information: Free shipping on orders over $500!');
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) { // Validate form before submission
      const checkoutData = this.checkoutForm.value;

      // Process the order (e.g., send data to a server)
      console.log('Order placed:', checkoutData);

      // Update the user's details if userId is available
      if (this.userId !== null) {
        const updatedUser = {
          ...this.authService.getCurrentUser(),
          address: checkoutData.address,
          phone: checkoutData.phone,
          email: checkoutData.email,
          textAlerts: checkoutData.textAlerts
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
    } else {
      console.error('Form is invalid. Please fill in all required fields.');
    }
  }

  // Navigate to payment
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
