import { Component, AfterViewInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

declare var google: any; // Declare Google Pay
declare var paypal: any; // Declare PayPal

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements AfterViewInit {
  @Input() totalAmount: number = 0; // Total amount to be paid
  @Input() merchantId: string = 'your-merchant-id'; // Dynamic merchant ID for Google Pay
  @Input() gateway: string = 'example'; // Dynamic gateway for Google Pay
  @Input() currencyCode: string = 'USD'; // Currency code

  selectedPaymentMethod: string = 'creditOrDebitCard'; // Default payment method
  paymentData = {
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  };

  private paymentsClient: any; // Google Pay client

  constructor(private router: Router, private cartService: CartService) {
    this.paymentsClient = new google.payments.api.PaymentsClient({ environment: 'TEST' });
  }

  ngAfterViewInit(): void {
    this.initializePayPal();
  }

  onSubmit(): void {
    switch (this.selectedPaymentMethod) {
      case 'creditOrDebitCard':
        if (this.validateCardDetails()) {
          console.log('Processing credit/debit card payment with details:', this.paymentData);
          alert('Credit/Debit card payment processed successfully!');
        } else {
          alert('Invalid card details. Please check and try again.');
          return;
        }
        break;

      case 'googlePay':
        this.processGooglePay();
        break;

      case 'paypal':
        // PayPal is handled by the PayPal button
        break;

      case 'cashOnDelivery':
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

  validateCardDetails(): boolean {
    const cardNumberValid = /^\d{16}$/.test(this.paymentData.cardNumber); // Basic validation for 16-digit card
    const expiryDateValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(this.paymentData.expiryDate); // MM/YY format
    const cvvValid = /^\d{3}$/.test(this.paymentData.cvv); // 3-digit CVV
    return cardNumberValid && expiryDateValid && cvvValid;
  }

  // Google Pay processing
  processGooglePay(): void {
    const paymentDataRequest = this.getGooglePaymentDataRequest();
    this.paymentsClient.loadPaymentData(paymentDataRequest)
      .then((paymentData: any) => {
        console.log('Google Pay payment successful', paymentData);
        alert('Google Pay payment processed successfully!');
        // Here, send the payment data to your server for processing.
      })
      .catch((err: any) => {
        console.error('Google Pay payment failed', err);
        alert('Google Pay payment failed. Please try again.');
      });
  }

  // Create Google Payment Data Request
  getGooglePaymentDataRequest() {
    return {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [{
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['VISA', 'MASTERCARD']
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: this.gateway, // Use the dynamic gateway name
            gatewayMerchantId: this.merchantId // Use the dynamic merchant ID
          }
        }
      }],
      merchantInfo: {
        merchantId: this.merchantId, // Use the dynamic merchant ID
        merchantName: 'Cine Paradise'
      },
      transactionInfo: {
        totalPriceStatus: 'FINAL',
        totalPrice: this.totalAmount.toFixed(2), // Use the dynamic amount
        currencyCode: this.currencyCode // Use the dynamic currency code
      }
    };
  }

  // Initialize PayPal button
  initializePayPal(): void {
    paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: this.totalAmount.toFixed(2) // Use the dynamic amount
            }
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          console.log('PayPal payment successful', details);
          alert('PayPal payment processed successfully!');
          // Here, send the payment data to your server for processing.
        });
      },
      onError: (err: any) => {
        console.error('PayPal payment failed', err);
        alert('PayPal payment failed. Please try again.');
      }
    }).render('#paypal-button-container');
  }
}
