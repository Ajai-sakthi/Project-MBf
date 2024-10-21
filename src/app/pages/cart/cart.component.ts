// src/app/cart/cart.component.ts
import { Component, OnInit, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { CartItem } from '../../models/cart-item.model'; // Adjust path as needed

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = []; // Specify the type as CartItem[]
  cartItemsSignal = signal<CartItem[]>([]);
  totalItems: number = 0;
  totalPrice: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.loadCartItems();
    this.loadCart(); // Load cart items when the component initializes
  }

  // Load items from the cart
  loadCart(): void {
    this.cartItems = this.cartService.getCartItems(); // Load items from the cart service
    this.cartItemsSignal.set(this.cartItems);
    this.updateTotals(); // Calculate totals on load
  }

  // Update the total items and total price in the cart
  updateTotals(): void {
    this.totalItems = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    this.totalPrice = this.cartItems.reduce((sum, item) => {
      const cleanPrice = parseFloat(item.price.replace(/,/g, '')); // Clean the price string of commas
      return sum + (cleanPrice * item.quantity); // Multiply price by quantity
    }, 0);
  }

  // Called when the user changes the quantity of a product in the cart
  updateQuantity(item: CartItem): void {
    // Ensure quantity is at least 1
    if (item.quantity < 0) {
      item.quantity = 0;
    }

    // Update the cart service with the new quantity
    this.cartService.updateItemQuantity(item);

    // Recalculate totals after the quantity change
    this.updateTotals();
  }

  // Remove an item from the cart
  removeFromCart(item: CartItem): void {
    this.cartService.removeItem(item); // Remove item from cart service
    this.loadCart(); // Reload the cart to reflect removal
  }

  // Navigate to the checkout page
  goToCheckout(): void {
    this.router.navigate(['/checkout']); // Redirect to the checkout page
  }

  // Method to generate star ratings
  getStars(rating: number): number[] {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return [
      ...Array(fullStars).fill(1),
      ...Array(halfStar).fill(0.5),
      ...Array(emptyStars).fill(0)
    ];
  }
}
