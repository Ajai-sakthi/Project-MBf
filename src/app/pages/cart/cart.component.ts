import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { CartItem } from '../../models/cart-item.model'; // Ensure this model is correctly defined

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartPageComponent implements OnInit {
  cartItems: CartItem[] = []; // List of items in the cart
  defaultImage: string = 'assets/images/default-product.png'; // Fallback image
  totalPrice: number = 0; // Total price of the cart

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  // Load cart items and calculate total price
  loadCart(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotalPrice();
  }

  // Calculate total price based on cart items
  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  // Remove an item from the cart
  removeFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
    this.loadCart(); // Reload the cart after removal
  }

  // Update the quantity of a cart item
  updateCartItemQuantity(item: CartItem): void {
    this.cartService.updateCartItemQuantity(item);
    this.calculateTotalPrice(); // Recalculate the total price
  }

  validateQuantity(item: CartItem): void {
    // Ensure quantity is a number and greater than 0
    if (item.quantity < 1) {
      item.quantity = 1; // Reset to minimum quantity
    }
  }

  // Navigate to the checkout page
  proceedToCheckout(): void {
    this.router.navigate(['/checkout']);
  }

  // Check if checkout should be disabled
  isCheckoutDisabled(): boolean {
    return this.cartItems.length === 0;
  }

  // Track items by unique id for performance
  trackByItemId(index: number, item: CartItem): number {
    return item.id; // Track items by unique id
  }
}
