import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service'; // Ensure you have this service for clearing the cart

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  selectedPaymentMethod: string = 'creditOrDebitCard'; // Default payment method
  paymentData = {
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  };

  constructor(private router: Router, private cartService: CartService) {}

  onSubmit(): void {
    // Process payment based on selected method
    switch (this.selectedPaymentMethod) {
      case 'creditOrDebitCard':
        if (this.validateCardDetails()) {
          // Here you would typically call your backend service to process the payment
          console.log('Processing credit/debit card payment with details:', this.paymentData);
          alert('Credit/Debit card payment processed successfully!');
        } else {
          alert('Invalid card details. Please check and try again.');
          return;
        }
        break;

      case 'googlePay':
        // Implement Google Pay integration logic here
        console.log('Processing payment via Google Pay');
        alert('Google Pay payment processed successfully!');
        break;

      case 'paypal':
        // Implement PayPal integration logic here
        console.log('Processing payment via PayPal');
        alert('PayPal payment processed successfully!');
        break;

      case 'cashOnDelivery':
        // Logic for cash on delivery
        console.log('Order will be paid with cash on delivery');
        alert('Cash on Delivery selected. Your order will be confirmed.');
        break;

      default:
        alert('Please select a payment method.');
        return;
    }

    // Clear the cart after successful payment
    this.cartService.clearCart();

    // Redirect to the home page
    this.router.navigate(['/']);
  }

  // Validate card details
  validateCardDetails(): boolean {
    const cardNumberValid = /^\d{16}$/.test(this.paymentData.cardNumber); // Basic validation for 16-digit card
    const expiryDateValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(this.paymentData.expiryDate); // MM/YY format
    const cvvValid = /^\d{3}$/.test(this.paymentData.cvv); // 3-digit CVV
    return cardNumberValid && expiryDateValid && cvvValid;
  }
}
