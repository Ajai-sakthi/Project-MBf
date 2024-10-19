import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model'; // Correct import
import { OrderService } from '../../services/order.service'; // Correct import

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = []; // Use CartItem
  totalPrice: number = 0;
  checkout: any = {};
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

  defaultImage: string = 'assets/images/default-product-image.jpg';

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
    this.cartItems = this.cartService.getCartItems(); // Ensure getCartItems() is used
  }

  // Calculate the total price of the cart
  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity, 0 // Use CartItem's price and quantity
    );
  }

  trackByItemId(index: number, item: CartItem): number {
    return item.id; // CartItem has an id property
  }

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

  placeOrder(): void {
    if (this.isCheckoutDisabled()) {
      alert('Please fill out all the required fields.');
      return;
    }

    const orderDetails = {
      shippingDetails: this.shippingDetails,
      paymentDetails: this.paymentDetails,
      cartItems: this.cartItems, // cartItems are of type CartItem
      totalPrice: this.totalPrice
    };

    this.orderService.placeOrder(orderDetails).subscribe(
      response => {
        this.router.navigate(['/order-confirmation']);
      },
      error => {
        console.error('Error placing order', error);
        alert('There was an error processing your order. Please try again.');
      }
    );
  }
}
