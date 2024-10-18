import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';
import { OrderService } from '../../services/order.service'; // Correct import

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  //shippingDetails: any = {};
  //paymentDetails: any = {};
  checkout: any = {};
  // Shipping and Payment Details
  shippingDetails = {
    fullName: '',
    address: '',
    city: '',
    postalCode: ''
  };

  paymentDetails = {
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  };

  // Default image for items that don't have an image
  defaultImage: string = 'assets/images/default-product-image.jpg'; // You can set the path to any placeholder image

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
    this.calculateTotalPrice();
  }

  // Load cart items from cart service
  loadCartItems(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  // Calculate the total price of the cart
  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity, 0
    );
  }

  // Track items by their unique IDs
  trackByItemId(index: number, item: CartItem): number {
    return item.id;
  }

  // Validate form before proceeding to checkout
  isCheckoutDisabled(): boolean {
    return !this.shippingDetails.fullName ||
           !this.shippingDetails.address ||
           !this.shippingDetails.city ||
           !this.shippingDetails.postalCode ||
           !this.paymentDetails.cardName ||
           !this.paymentDetails.cardNumber ||
           !this.paymentDetails.expiryDate ||
           !this.paymentDetails.cvv ||
           this.cartItems.length === 0;
  }

  // Place the order
  placeOrder(): void {
    if (this.isCheckoutDisabled()) {
      alert('Please fill out all the required fields.');
      return;
    }

    const orderDetails = {
      shippingDetails: this.shippingDetails,
      paymentDetails: this.paymentDetails,
      cartItems: this.cartItems,
      totalPrice: this.totalPrice
    };

    // Send order details to order service for processing
    this.orderService.placeOrder(orderDetails).subscribe(
      response => {
        // Navigate to the order confirmation page
        this.router.navigate(['/order-confirmation']);
      },
      error => {
        console.error('Error placing order', error);
        alert('There was an error processing your order. Please try again.');
      }
    );
  }
}
